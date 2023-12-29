import axios from "axios";

const INCOME_API_BASE_URL = "http://localhost:8082/api/v1/income";

class IncomeService {

    saveIncome(income){
        return axios.post(INCOME_API_BASE_URL,income)
    }

    getIncome(){
        return axios.get(INCOME_API_BASE_URL)
    }
    fetchIncomeTotalById(incomeSourceId){
        return axios.get(`http://localhost:8082/api/v1/income/${incomeSourceId}/total`);
    }
    deleteIncome(incomeId){
        return axios.delete(`http://localhost:8082/api/v1/income/${incomeId}` )
    }
}

export default new IncomeService();