import React, { Component } from 'react'

class App extends Component {
    constructor(){
        super()
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        }
        this.addTask = this.addTask.bind(this)
        this.handleChange = this.handleChange.bind(this) 
    }
    addTask(e){
        if(this.state._id){
            fetch(`/api/task/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html:'Task Updated'})
                this.setState({title:'', description:'', _id:''})
                this.fetchTask()
            })
        } else {
            fetch('/api/task',{
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html:'Task Saved'})
                    this.setState({title:'',description:''})
                    this.fetchTask()
                })
                .catch(error => console.log(error))
        }
            
        e.preventDefault()
    }

    componentDidMount(){
        this.fetchTask()
    }

    fetchTask(){
        fetch('/api/task')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({tasks: data})
                console.log(this.state.tasks)
            })
        }

    handleChange(e){
        const {name, value} = e.target
        this.setState({
            [name]:value
        })
    }

    deleteTask(id){
        if(confirm('Are you sure you want to delete it?')){
            fetch(`/api/task/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json)
            .then(data => {
                console.log(data)
                M.toast({html: 'Task deleted'})
                this.fetchTask()
            })
        }
    }

    editTask(id) {
        fetch(`/api/task/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            })
    }
    render(){
        return (
            <div>
                {/* NAVEGATION */}
                <nav className="pink darken-2">
                    <div className="container">
                        <a className="brand-logo" href="/">Task</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input 
                                                    name="title"
                                                    type="text"
                                                    placeholder="Task title"
                                                    onChange={this.handleChange}
                                                    value={this.state.title}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea
                                                    name="description"
                                                    placeholder="Task description"
                                                    className="materialize-textarea"
                                                    onChange={this.handleChange}
                                                    value={this.state.description}>
                                                </textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn pink darken-2">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button
                                                            className="btn pink darken-2"
                                                            onClick={
                                                                () => this.editTask(task._id)}>
                                                                <i className="material-icons">edit</i>
                                                        </button>
                                                        <button 
                                                            className="btn pink darken-2"
                                                            style={{margin: '4px'}}
                                                            onClick={() => {
                                                                this.deleteTask(task._id)
                                                            }}>
                                                                <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>  
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default App;
