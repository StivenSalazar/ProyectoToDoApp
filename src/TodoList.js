import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import "./TodoList.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSTransition, TransitionGroup } from "react-transition-group";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      todos: []
    };
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
  }

  create(newTodo) {
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  }
  remove(id) {
    this.setState({
      todos: this.state.todos.filter(t => t.id !== id)
    });
  }
  update(id, updatedTask) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  }
  toggleCompletion(id) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  }
  render() {
    const todos = this.state.todos.map(todo => {
      return (
        <CSSTransition key={todo.id} timeout={500} classNames='todo'>
          <Todo
            key={todo.id}
            id={todo.id}
            task={todo.task}
            completed={todo.completed}
            removeTodo={this.remove}
            updateTodo={this.update}
            toggleTodo={this.toggleCompletion}
          />
        </CSSTransition>
      );
    });
    return (
      <div>

        <Navbar id="mainNavbar" className="navbar navbar-dark navbar-expand-md py-0 fixed-top" bg="light" expand="lg" ref={this.myRef}>
          <Container>
            <Navbar.Brand href="#home" className="navbar-brand">ToDo App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">About</Nav.Link>
                <NavDropdown title="Acerca De" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Stiven Salazar</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">UDFJC</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">GISAC</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">ToDo App</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>


        <div className='TodoList'>
          <h1>
            ToDo List App <span>Lista ToDo hecha con React Hooks</span>
          </h1>
          <NewTodoForm createTodo={this.create} />

          <ul>
            <TransitionGroup className='todo-list'>{todos}</TransitionGroup>
          </ul>
        </div>
      </div>

    );
  }
}
export default TodoList;
