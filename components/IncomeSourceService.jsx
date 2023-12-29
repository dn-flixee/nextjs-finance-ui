import axios from "axios";

const INCOME_SOURCE_API_BASE_URL = "http://localhost:8082/api/v1/incomeSource";

class IncomeService {

    saveIncomeSource(incomeSource){
        return axios.post(INCOME_SOURCE_API_BASE_URL,incomeSource)
    }

    getIncomeSource(){
        return axios.get(INCOME_SOURCE_API_BASE_URL)
    }
}

export default new IncomeService();