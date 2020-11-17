import axios from 'axios';

export default {
    userGenerator:  async function(){
        const response = await axios.get('https://randomuser.me/api/?results=20&nat=us,ca');
        return response.data.results;
    }
}