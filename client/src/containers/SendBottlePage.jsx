import React from 'react';
import PropTypes from 'prop-types';
import SendBottleForm from '../pages/SendBottleForm.jsx';
var store = require('store')


//trying to add a modal component
// import Modal from 'material-ui/core/Modal';



class SendBottlePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {},
      open: false
    };


    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }
  componentDidMount() {
    if (store.get('bottle')) {
      let bottle = store.get('bottle')
      this.setState({
        user: {
          title: bottle.title,
          message: bottle.message
        }
      });
    }
  }
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    store.remove('bottle');

    // create a string for an HTTP body message
    const title = encodeURIComponent(this.state.user.title);
    const email = encodeURIComponent(localStorage.email);
    const message = encodeURIComponent(this.state.user.message);
    const formData = `name=${name}&email=${email}&message=${message}&title=${title}`;
    localStorage.title = title;
    localStorage.message = message;
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/sendbottle/messages');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {},
          user: {
            title: "",
            message: ""
          },
          title: '',
          email: '',
          message: ''
        });

        // set a message
        localStorage.setItem('successMessage', xhr.response.message);

        // redirect user after sign up to login page
        //this.props.history.push('/login');


        //this is part of my modal component
        //it isn't happy with them

        let handleOpen = () => {
          this.setState({ open: true });
        };

        let handleClose = () => {
          this.setState({ open: false });
        };









      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }

    });

    console.log(formData);
    xhr.send(formData);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user: user

    });
    store.set('bottle', {
      title: this.state.user.title,
      message: this.state.user.message,

    });
  }







  /**
   * Render the component.
   */
  render() {
    return (
      <SendBottleForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        email={this.state.email}
      />
    );
  }

}

SendBottlePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SendBottlePage;
