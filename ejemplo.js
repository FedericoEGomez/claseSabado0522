import axios from "axios"

const conseguirToken = async(email, password) => {
    try {
      const token = await axios.post("https://clasesabado0522-production.up.railway.app/user/login",{
            email,
            password
        })
        return token  
    } catch (error) {
        console.log(error)
    }
    
}

const getItems = async (token) => {
    try {
      const items = await axios.get("https://clasesabado0522-production.up.railway.app/api/ver",{
            headers:{
                'x-token': token
            }
        })
        return items  
    } catch (error) {
        console.log(error)
    }
}

const createItem = async (token, body)=>{
    try {
        const createItem = await axios.post("https://clasesabado0522-production.up.railway.app/api/crear",{
            nombre: body.nombre,
            pais: body.pais,
            copas:body.copas,
            clasifico: body.clasifico
        },{
            headers:{
                'x-token': token
            }
        })
    } catch (error) {
        console.log(error)
    }
}