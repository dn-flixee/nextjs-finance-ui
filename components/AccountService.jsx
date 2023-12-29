import axios from "axios";

const ACCOUNT_API_BASE_URL = "http://localhost:8082/api/v1/account";

class AccountService {

    saveAccount(account){
        return axios.post(ACCOUNT_API_BASE_URL,account)
    }

    getAccount(){
        return axios.get(ACCOUNT_API_BASE_URL)
    }
}

export default new AccountService();