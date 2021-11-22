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

        //console.log(await taxiTrips.totalTripCount());

        assert.deepEqual([{ sum: '15' }], await taxiTrips.totalTripCount());


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

        //assert.deepStrictEqual([], taxiTrips.findTripsByRegion('Cape Town').length);
        //assert.deepStrictEqual([], taxiTrips.findTripsByRegion('Gauteng').length);
        //assert.deepStrictEqual([], taxiTrips.findTripsByRegion('Gauteng').length);

    });

    /*it('find the total income for a given reg number', async function () {

        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual(0, taxiTrips.findIncomeByRegNumber('...').length);
        assert.deepStrictEqual(0, taxiTrips.findIncomeByRegNumber('***').length);

    });

    it('find the total income for each taxi', async function () {

        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual([{}, {}, {}], taxiTrips.findTotalIncomePerTaxi());

    });

    it('find the total income for all the taxis', async function () {
        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual(0.00, taxiTrips.findTotalIncome());
    });*/


    after(function () {
        pool.end();
    });

});