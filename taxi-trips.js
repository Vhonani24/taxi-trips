module.exports = function TaxiTrips(pool) {

    async function totalTripCount() {

        const result = await pool.query('select route_name from trips');

        return result.rowCount;

    }

    async function findAllRegions() {

        const result = await pool.query('select name from region');

        return result.rows;

    }
    async function findTaxisForRegion(region) {

        const result = await pool.query('select region.name,taxi.reg_number from region INNER JOIN taxi ON region.id = taxi.region_id where name = $1', [region]);

        return result.rows;



    }
    async function findTripsByRegNumber(reg_number) {

        const result = await pool.query('select route_name from trips where reg_number = $1', [reg_number]);

        return result.rows;

    }
    async function findTripsByRegion(region_name) {

        const result = await pool.query('select route_name from trips where region_name = $1', [region_name]);

        return result.rowCount;

    }
    async function findIncomeByRegNumber(reg_number) {
        var result =  await pool.query('SELECT fare FROM trips WHERE reg_number = $1',[reg_number]);
        return result.rows;

    }
    async function findTotalIncomePerTaxi(reg_number) {

        var result =  await pool.query('SELECT SUM(fare) FROM trips WHERE reg_number = $1',[reg_number]);
        return result.rows;

    }
    async function findTotalIncome() {

        var result =  await pool.query('SELECT SUM(fare) FROM trips');
        return result.rows;

    }
    async function findTotalIncomeByRegion(region_name) {
        
        var result =  await pool.query('SELECT SUM(fare) FROM trips WHERE region_name = $1',[region_name]);
        return result.rows;
    }




    return {

        totalTripCount,
        findAllRegions,
        findTaxisForRegion,
        findTripsByRegNumber,
        findTripsByRegion,
        findIncomeByRegNumber,
        findTotalIncomePerTaxi,
        findTotalIncome,
        findTotalIncomeByRegion




    }

}