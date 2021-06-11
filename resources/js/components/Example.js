
import React from 'react';
import ReactDOM from 'react-dom';
import {Table, 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    Label
} from 'reactstrap';
import axios from 'axios';

class Example extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        tasks:[],
        newTaskModal:false,
        newTaskData:{
            title:"",
            affectedTo:0
        },
        editTaskModal:false,
        editTaskData:{
            id:0,
            title:"",
            affectedTo:0,
            completed:0
        },
      };
    }
  
     loadTask=()=>{
        axios.get('http://127.0.0.1:8000/api/tasks').then((response) => {
            this.setState({
                tasks:response.data
            })
        });
    }
    componentWillMount(){
        this.loadTask();
    }
     addTask=()=>{
        axios.post('http://127.0.0.1:8000/api/task',this.state.newTaskData).then((response) => {
           let {tasks}= this.state;
           this.loadTask();
           this.setState({
               tasks,
               newTaskModal:false,
               newTaskData:{
                   title:"",
                   affectedTo:0
               }
           })
        });
    }
    
    editTask(id,title,affectedTo,completed){
        this.setState({
            editTaskData:{
                id,title,affectedTo,completed
            },
            editTaskModal:!this.state.editTaskModal
        })
        //console.log("editTask   ",this.state.editTaskData);
    }

    updateTask(){
        //console.log(this.state.editTaskData);
        let {title,affectedTo,completed}=this.state.editTaskData;
        //console.log("sqfffffffffff",taskId,"title   ",title,"affecteto   ",affectedTo,"completed  ",completed);
        axios.put('http://127.0.0.1:8000/api/task/'+this.state.editTaskData.id,{
            title,
            affectedTo,
            completed
        }).then((response) => {
            this.loadTask();
            this.setState({
                editTaskModal:false,
                editTaskData:{
                    id:0,
                    title:"",
                    affectedTo:0,
                    completed:0
                }
            })
        })
    }

    deleteTask(id){
        axios.delete('http://127.0.0.1:8000/api/task/'+id).then((response) => {
            this.loadTask()
        })
    }

     toggleNewTaskModal=()=>{
        this.setState({
            newTaskModal:!this.state.newTaskModal
        })
    }

    toggleEditTaskModal=()=>{
        this.setState({
            editTaskModal:!this.state.editTaskModal
        })
    }
    render() {
        let tasks=this.state.tasks.map((task) =>{
            return (
                <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.completed}</td>
                <td>{task.user_id}</td>
                <td>
                    <Button 
                        color="success" 
                        size="sm" 
                        className="mr-2"
                        onClick={this.editTask.bind(this,task.id,task.title,task.user_id,task.completed)}
                    >Edit</Button>
                    <Button 
                        color="danger" 
                        size="sm"
                        onClick={this.deleteTask.bind(this,task.id)}
                        >Delete</Button>
                </td>
            </tr>
            )
        })
      return (
        <div className="container">
        <Button color="primary" onClick={this.toggleNewTaskModal.bind(this)}>Ajouter une tâche</Button>
        <Modal isOpen={this.state.newTaskModal} toggle={this.toggleNewTaskModal.bind(this)}>
                <ModalHeader toggle={this.toggleNewTaskModal.bind(this)}>Modal title</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="title">Titre</Label>
                        <Input id="title" 
                            value={this.state.newTaskData.title}
                            onChange= {((e) => {
                                let newTaskData = this.state.newTaskData
                                newTaskData.title=e.target.value
                                this.setState({newTaskData})
                            })}
                        ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="affectedTo">Affecté à</Label>
                        <Input id="affectedTo"
                            value={this.state.newTaskData.affectedTo}
                            onChange= {((e) => {
                                let newTaskData = this.state.newTaskData
                                newTaskData.affectedTo=e.target.value
                                this.setState({newTaskData})
                            })}
                        ></Input>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={this.addTask.bind(this)}>Add Task</Button>{' '}
                <Button color="secondary" onClick={this.toggleNewTaskModal.bind(this)}>Cancel</Button>
                </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editTaskModal} toggle={this.toggleEditTaskModal.bind(this)}>
                <ModalHeader toggle={this.toggleEditTaskModal.bind(this)}>Modal title</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="title">Titre</Label>
                        <Input id="title" 
                            value={this.state.editTaskData.title}
                            onChange= {((e) => {
                                let editTaskData = this.state.editTaskData
                                editTaskData.title=e.target.value
                                this.setState({editTaskData})
                            })}
                        ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="completed">complété</Label>
                        <Input id="completed" 
                            value={this.state.editTaskData.completed}
                            onChange= {((e) => {
                                let editTaskData = this.state.editTaskData
                                editTaskData.completed=e.target.value
                                this.setState({editTaskData})
                            })}
                        ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="affectedTo">Affecté à</Label>
                        <Input id="affectedTo"
                            value={this.state.editTaskData.affectedTo}
                            onChange= {((e) => {
                                let editTaskData = this.state.editTaskData
                                editTaskData.affectedTo=e.target.value
                                this.setState({editTaskData})
                            })}
                        ></Input>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={this.updateTask.bind(this)}> Modifier</Button>{' '}
                <Button color="secondary" onClick={this.toggleEditTaskModal.bind(this)}>Cancel</Button>
                </ModalFooter>
        </Modal>
       <Table>
           <thead>
            <tr>
                <th>Titre</th>
                <th>Complété</th>
                <th>Affecté à</th>
                <th>Opérations</th>
            </tr>
           </thead>
           <tbody>
              {tasks}
           </tbody>
       </Table>
    </div>
      );
    }
  }

  export default Example;

  if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}