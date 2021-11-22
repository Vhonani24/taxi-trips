let assert = require("assert");
let TaxiTrips = require("../taxi-trips");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://vhonani:vhonani123@localhost:5432/taxi_trips_tests';

const pool = new Pool({
    connectionString
});

describe('Taxi Trips', function () {

    // beforeEach(async function () {

    // });

    it('should find how many trips all the taxis made', async function () {

        const taxiTrips = TaxiTrips(pool);

        console.log(await taxiTrips.totalTripCount());

        assert.deepEqual([{ sum: '21' }], await taxiTrips.totalTripCount());


    });

    it('should find all the regions', async function () {

        const taxiTrips = TaxiTrips(pool);

        //console.log(await taxiTrips.findAllRegions());

        assert.deepEqual([
            { name: 'Durban' },
            { name: 'Cape Town' },
            { name: 'Gauteng' }], await taxiTrips.findAllRegions());

    });

    it('should find all the taxis for a region', async function () {
        const taxiTrips = TaxiTrips(pool);


        assert.deepEqual(
            [
                { name: 'Durban', reg_number: 'ZN 333 444' },
                { name: 'Durban', reg_number: 'ZN 111 000' }
            ], await taxiTrips.findTaxisForRegion('Durban'));
        assert.deepStrictEqual(
            [
                { name: 'Cape Town', reg_number: 'CA 123 456' },
                { name: 'Cape Town', reg_number: 'CA 456 789' }
            ], await taxiTrips.findTaxisForRegion('Cape Town'));
        assert.deepStrictEqual([
            { name: 'Gauteng', reg_number: 'GP 666 222' },
            { name: 'Gauteng', reg_number: 'GP 222 999' }
        ], await taxiTrips.findTaxisForRegion('Gauteng'));

    })

    it('should find all the trips for a reg number', async function () {

        const taxiTrips = TaxiTrips(pool);


        //console.log(await taxiTrips.findTripsByRegNumber('CA 123 456'));

        assert.deepStrictEqual(
            [{ route_name: 'Sandton - Randburg' },
            { route_name: 'Sandton - Randburg' },
            { route_name: 'Alexandra - Sandton' }
            ], await taxiTrips.findTripsByRegNumber('GP 123 000'));
        assert.deepStrictEqual([{ route_name: 'Cape Town - Bellville' },
        { route_name: 'Cape Town - Langa' }
        ], await taxiTrips.findTripsByRegNumber('CA 123 456'));

    });

    it('should find the total number of trips by region', async function () {

        const taxiTrips = TaxiTrips(pool);

        console.log(await taxiTrips.findTripsByRegion('Cape Town'));

        assert.deepEqual(2, await taxiTrips.findTripsByRegion('Cape Town'));
        assert.deepStrictEqual(3, await taxiTrips.findTripsByRegion('Gauteng'));
        assert.deepStrictEqual(1, await taxiTrips.findTripsByRegion('Durban'));

    });

    it('find the total income for a given reg number', async function () {

        const taxiTrips = TaxiTrips(pool);


        console.log(await taxiTrips.findIncomeByRegNumber('GP 123 000'));
        assert.deepStrictEqual([{ fare: '50.00' }, { fare: '50.00' }, { fare: '35.00' }]
            , await taxiTrips.findIncomeByRegNumber('GP 123 000'));
        assert.deepStrictEqual([{ fare: '23.00' }, { fare: '180.00' }], await taxiTrips.findIncomeByRegNumber('CA 123 456'));

    });

    it('find the total income per taxi', async function () {

        const taxiTrips = TaxiTrips(pool);

        //console.log(await taxiTrips.findTotalIncomePerTaxi('GP 123 000'));
        assert.deepEqual([{sum:'135.00'}], await taxiTrips.findTotalIncomePerTaxi('GP 123 000'));

    });

    it('Find the total amount received in income for all the taxis', async function () {
        const taxiTrips = TaxiTrips(pool);

        //console.log(await taxiTrips.findTotalIncome());
        assert.deepEqual([{sum: '398.00'}], await taxiTrips.findTotalIncome());
    });

    it('Find the total amount income for each of the regions', async function () {
        const taxiTrips = TaxiTrips(pool);

        console.log(await taxiTrips.findTotalIncomeByRegion('Gauteng'));
        assert.deepEqual([{sum: '135.00'}], await taxiTrips.findTotalIncomeByRegion('Gauteng'));
    });



    after(function () {
        pool.end();
    });

});