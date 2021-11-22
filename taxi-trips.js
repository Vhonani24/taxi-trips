module.exports = function TaxiTrips(pool) {

    async function totalTripCount() {

        var result = await pool.query('SELECT SUM(trip_count) FROM trips');
        return result.rows;

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

        const result = await pool.query('select COUNT(route_name) from trips where region_name = $1', [region_name]);

        return result.rowCOUNT;

    }
    async function findIncomeByRegNumber() {

    }
    async function findTotalIncomePerTaxi() {

    }
    async function findTotalIncome() {

    }
    async function findTotalIncomeByRegion() {

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