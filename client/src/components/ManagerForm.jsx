import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import './Manager.css'
const ManagerForm = () => {
    const [errors, setErrors] = useState([])
    const [form, setForm] = useState({
        name: "",
        dueDate: ""
    })
    const [nameError, setNameError] = useState("")
    const navigate = useNavigate()
    const [manager, setManager] = useState([])
    const [updated, setUpdated] = useState(false)

    const managerError = (e) => {
        setForm({...form, name: e.target.value})
        if(e.target.value.length == 0){
            setNameError(" ");
        }
        else if(e.target.value.length < 3) {
            setNameError("Project name must be 3 characters or longer!");
        } else {
            setNameError(" ");
        }
    }
    useEffect(()=>{
        axios.get('http://localhost:8000/api/projects')
            .then(res => {
                setManager(res.data)
                setUpdated(!updated)
            })
            .catch(err => console.log(err))
    }, [updated])


    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log("CLICKED")
        axios.post('http://localhost:8000/api/projects', form)
            .then(res => navigate('/'))
            .catch(err => {
                if (err.response && err.response.data && err.response.data.errors) {
                    setErrors(err.response.data.errors);
                }
                console.log("Error:", err);
            });
    }
    return (
        <>
            <Link to="/">Back to Dashboard</Link>
            <div className="container-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" value={form.name} onChange={managerError} placeholder="Project name" />
                        {nameError ?  <span className="error-message"> {nameError} </span> : ""}
                        {errors && errors.name && (
                            <div style={{ color: 'red' }}>{errors.name.message}</div>
                        )}
                        <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
                        {errors && errors.dueDate && (
                            <div style={{ color: 'red' }}>{errors.dueDate.message}</div>
                        )}
                    </div>
                    <input type="submit" value="Plan Project" className="blue-button"/>

                </form>
            </div>
            
        </>
    )
}
export default ManagerForm