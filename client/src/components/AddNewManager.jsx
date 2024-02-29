import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import './Manager.css'
import moment from 'moment'
const AddNewManager = () => {
    const [managers, setManagers] = useState([])
    const [updated, setUpdated] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:8000/api/projects')
            .then(res => {
                setManagers(res.data)
                setUpdated(!updated)
            })
            .catch(err => console.log(err))
    }, [updated])
    const changeState = (id, state) => {
        console.log(state)
        console.log(id)
        axios.patch('http://localhost:8000/api/projects/' + id, { state: state })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    const parseDueDate = (dueDate) => {
        return moment(dueDate).format('MMM Do YY');
    };

    const removemanager = (id) => {
        console.log(id)
        axios.delete('http://localhost:8000/api/projects/' + id)
            .then(res => {
                console.log(res)
                setManagers(managers.filter(manager => manager._id !== id))
            })
    }
    return (
        <>

            <div className="view">
                <div className="boxx">
                    <div className="title">
                        <h1 className="h1">Backlog</h1>

                    </div>
                    <div className="box1">
                        {managers.filter(e => e.state === 'Backlog').sort((a, b) => a.dueDate.localeCompare(b.dueDate)).map((manager, index) => {
                            const dueDate = parseDueDate(manager.dueDate);
                            const duePast = moment(manager.dueDate).isBefore(moment(), 'day');
                            return (
                                <div key={index} className="smallbox">
                                    <div className="bold-text">
                                        {manager.name}
                                    </div>
                                    <div >
                                        Due date:  <span className={`${duePast ? 'duepast-style' : ''}`}> {dueDate} </span> 
                                    </div>
                                    <button className="everdh" onClick={() => changeState(manager._id, "in progress")}>Start manager →</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="boxx">
                    <div className="title1">
                        <h1 className="h1">In Progress</h1>
                    </div>
                    <div className="scrollable-content">
                        {managers.filter(e => e.state === 'in progress').sort((a, b) => a.dueDate.localeCompare(b.dueDate)).map((manager, index) => {
                             const dueDate = parseDueDate(manager.dueDate);
                             const duePast = moment(manager.dueDate).isBefore(moment(), 'day');
                            return (
                                <div key={index} className="smallbox">
                                    <div className="bold-text">
                                        {manager.name}
                                    </div>
                                    <div >
                                        Due date:  <span className={`${duePast ? 'duepast-style' : ''}`}> {dueDate} </span> 
                                    </div>
                                    <button className="jeshile" onClick={() => changeState(manager._id, "completed")}>Move to Completed →</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="boxx">
                    <div className="title2">
                        <h1 className="h1">Completed</h1>
                    </div>
                    <div className="scrollable-content">
                        {managers.filter(e => e.state === 'completed').sort((a, b) => a.dueDate.localeCompare(b.dueDate)).map((manager, index) => {
                            const dueDate = parseDueDate(manager.dueDate);
                            const duePast = moment(manager.dueDate).isBefore(moment(), 'day');
                            return(
                            <div key={index} className="smallbox">
                                <div className="bold-text">
                                    {manager.name}
                                </div>
                                <div >
                                        Due date:  <span className={`${duePast ? 'duepast-style' : ''}`}> {dueDate} </span> 
                                    </div>
                                <button className="ekuqe" onClick={() => removemanager(manager._id)}>
                                    X Remove Project
                                </button>
                            </div>
                        )})}
                    </div>
                </div>
            </div>
            <Link className="ai" to="/projects/new">Add new Project</Link>


        </>
    )
}
export default AddNewManager;