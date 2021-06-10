import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import "./bootstrap3/css/bootstrap.scoped.css"

// import './bootstrap4/css/bootstrap.scoped.css';

import 'react-phone-input-2/lib/style.css';
import './modal.scoped.css';
import "./style.scoped.css"


const stockChoices = [
    { id: 1, el_id: 'pickup-1', value: 'To buy stocks', label: "To buy stocks" },
    { id: 2, el_id: 'pickup-2', value: 'To sell stocks, I have inventory', label: "To sell stocks, I have inventory" },
]
class TradeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company_name: props.c_id,
            intrest_stock: 'To buy stocks',
            email: '',
            rawPhone: '',
            phone: '',
            comments: '',
            newLatter: 0,
            emailError: '',
            phoneError: '',
            commentError: '',
            success:false,
            error:false,
            respMessage:'',
        };
        this.handleChangeStock = this.handleChangeStock.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeComments = this.handleChangeComments.bind(this);

    }
    handlePhoneValidation = () => {
        const { rawPhone } = this.state;
        let formIsValid = true;
        if (rawPhone.length > 0) {
            this.setState({
                phoneError: null
            });
        } else {
            this.setState({
                phoneError: 'Phone field is required'
            });
            formIsValid = false;
        }
        return formIsValid;
    }
    handleEmailValidation = () => {
        const { email } = this.state;
        let formIsValid = true;
        if (email === '') {
            formIsValid = false;
            this.setState({
                emailError: 'Email field is requred.'
            });
        } else if (typeof email !== "undefined") {
            let lastAtPos = email.lastIndexOf('@');
            let lastDotPos = email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                formIsValid = false;
                this.setState({
                    emailError: 'Invalid Email ! Please enter a valid email address.'
                });
            } else {
                this.setState({
                    emailError: ''
                });
            }
        } else {
            this.setState({
                emailError: ''
            });
        }
        return formIsValid;
    }
    handleCommentValidation = () => {
        const { comments } = this.state;
        let formIsValid = true;
        if (comments !== '') {
            this.setState({
                commentError: null
            });
        } else {
            this.setState({
                commentError: 'Comment field is required'
            });
            formIsValid = false;
        }
        return formIsValid;
    }

    handleChangeStock = (e) => {
        this.setState({ intrest_stock: e.target.value });
    };
    handleChangeEmail = (e) => {
        this.setState({ email: e.target.value });
        this.handleEmailValidation();
    };
    handlePhoneChange = (value, data, event, formattedValue) => {
        this.setState({ phone: event.target.value, rawPhone: value.slice(data.dialCode.length) }, () => {
            this.handlePhoneValidation();
        });
    };
    handleChangeComments = (e) => {
        this.setState({ comments: e.target.value });
        this.handleCommentValidation();
    };
    handleChangeNewsLatter = (e) => {
        if (e.target.checked) {
            this.setState({ newLatter: 1 });
        } else {
            this.setState({ newLatter: 1 });
        }

    };

    onSubmit(e) {
        e.preventDefault();
        const emailValid = this.handleEmailValidation();
        const phoneValid = this.handlePhoneValidation();
        const commentValid = this.handleCommentValidation();
        if(emailValid && phoneValid && commentValid){
         const data={
             "company_name":this.state.company_name,
             "intrest_stock":this.state.intrest_stock,
             "email":this.state.email,
             "phone":this.state.phone,
             "comments":this.state.comments,
             "newLatter":this.state.newLatter
         }
         const json = JSON.stringify(data);
         axios.post('https://api.unlistedassets.com/trade-form/submit', json, {
           headers: {
             // Overwrite Axios's automatically set Content-Type
             'Content-Type': 'application/json'
           }
         }).then(res => {
           const resData = res.data;
           if(resData === true){
             this.setState({
               success:true,
               respMessage:"You have Successfully submitted your request."
             });
           }else{
             this.setState({
               success:false,
               error:true,
               respMessage:"Something went wrong!"
             });
           }
           
        }).catch(error => {
              this.setState({
                success:false,
                error:true,
                respMessage:"Something went wrong!"
               });
                 console.error('There was an error!', error);
             });
        }

    }
    render() {
        console.log('rendering modal')
        const { intrest_stock } = this.state;
        const showHideClassName = this.props.show ? "modal pd-50 display-block " : "modal pd-50 display-none";
        return (
            <><div className={showHideClassName}>
                <section className="modal-main trade-modal-main">
                    <div class="modal-header">
                        <button type="button" class="close" onClick={this.props.handleClose}><i class="fa fa-times"></i></button>
                    </div>
                    <div class="modal-content">

                        <div class="modal-body trade-modal pd-50">
                        {
                    this.state.error ? <div class="alert alert-danger alert-dismissible fade show" role="alert">
   {this.state.respMessage }
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div> : null
                  }
                  {
                    this.state.success ? <div class="alert alert-success alert-dismissible show" role="alert">
  <strong>Thank You</strong> {this.state.respMessage }
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div> : null
                  }
                            <div class="row modal-center-row">
                                <div class="col-md-12">
                                    <div className="heading-section">
                                        <h3>Let us know about your interest </h3>
                                        <p> We are soon launching a transparent and secure plateform for buying and selling of unlisted shares. Till then, We will provide you with a safe and secure offline support for trading unlisted stocks. </p>

                                    </div>

                                    <div className="form-wrapper">
                                        <form onSubmit={this.onSubmit.bind(this)}>
                                            <div className="form-group row">
                                                <div className="col-md-12">
                                                    <label htmlFor="company_of_interest">Company of interest *</label>
                                                    <p>{this.props.c_id}</p>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-12">
                                                    <label htmlFor="company_of_interest">I am seriously interested *</label>
                                                </div>
                                                <div className="form-group radio-button-control">
                                                    {stockChoices.map((choice, index) => (
                                                        <div className="col-md-6 customRadio" key={index}>
                                                            <input
                                                                className="radio-control"
                                                                type="radio"
                                                                value={choice.value}
                                                                key={index}
                                                                name="stock"
                                                                id={choice.el_id}
                                                                checked={intrest_stock === choice.value}
                                                                onChange={this.handleChangeStock} />
                                                            <label htmlFor={choice.el_id}> {choice.label} <span className="checkmark" /></label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-6">
                                                    <label htmlFor="email">Email *</label>
                                                    <input type="text" name="email" className="form-control" placeholder="johndoe@gmail.com" onChange={this.handleChangeEmail} onBlur={this.handleEmailValidation} />
                                                    <div className='invalid-feedback'>{this.state.emailError}</div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="phone">Phone *</label>
                                                    <PhoneInput
                                                        containerClass={`${this.state.phoneError ? 'is-invalid-phone' : ''}`}
                                                        country={'in'}
                                                        value={this.state.phone}

                                                        onChange={this.handlePhoneChange}
                                                        onBlur={this.handlePhoneValidation}
                                                    />
                                                    <div className='invalid-feedback'>{this.state.phoneError}</div>
                                                </div>

                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-12">
                                                    <label htmlFor="comment">Comment *</label>
                                                    <textarea
                                                        name="comments"
                                                        className="form-control textarea-control"
                                                        id="comment"
                                                        rows="5"
                                                        onChange={this.handleChangeComments}
                                                        onBlur={this.handleCommentValidation}
                                                    />
                                                    <div className='invalid-feedback'>{this.state.commentError}</div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-12 checkbox">
                                                    <input type="checkbox" id="check" name="newLatter" onChange={this.handleChangeNewsLatter} />
                                                    <label htmlFor="check"><span className="check " /> I would like to receive relevant updates related to stock inventories and product launch.</label></div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-12">
                                                    <p className="note-section"><strong>Note:</strong> Reach us at <Link to="/">hello@unlistedassets.com</Link> and we would be happy to help you. *By submitting this form you agree to the legal terms and conditions of this websites.</p>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-12 btn-trade-section">
                                                    <button className="cancel-btn" type="button" onClick={this.props.handleClose}> Cancel </button>
                                                    <button className="sbt-btn" type="submit"> Submit </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>
                </section>
            </div>
            </>
        )
    }
}
export default TradeModal;