/**
 * Created by Mello on 13.07.2017.
 */


import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff';
import '..//style/style.css';
import 'jquery/dist/jquery.js'


let sort = require('./sortPhone');
let sortPhone = sort.sortPhone,
    getData = sort.getData,
    KEY = sort.key,
    fields = sort.fields;

const phoneReference =  require('./dataAcquisition');
const addName =  require('./addName');


phoneReference(function () {
    //  let phoneNumber = getData(KEY);

    let Contact = React.createClass({
        render: function () {
            const {Fio, Phone, Email} = this.props;

            return (<tr>
                <td>{Fio}</td>
                <td>{Phone}</td>
                <td>{Email}</td>
            </tr>);
        }
    });


    let Phone = React.createClass({

        sortTable (e) {
            if (e.target.tagName !== 'TH') {
                return;
            }

            //сортируем если клик по заголовку
            const sorted = sortPhone(e.target.cellIndex);

            this.setState({
                displayedContacts: sorted
            })
        },
        addList (){
            const list = addName();
            this.setState({
                displayedContacts: list
            })
        },
        getInitialState () {
            return {
                displayedContacts: getData(KEY)
            }
        },

        filterTable: function (event) {
            let inputValue = event.target.value.toLowerCase();
            let displayedContacts = getData(KEY).filter((item) => {
                    for (let key in item) {
                        if (String(item[key]).toLowerCase().indexOf(inputValue) > -1) {
                            return true;
                        }
                    }
                }
            );

            this.setState({
                displayedContacts: displayedContacts
            })
        },
        render: function () {

            return (
                <div>
                    <div id='addElement' className='modal fade'>
                        <div className='modal-dialog'>
                            <div className='modal-content'>
                                <div className='modal-body'>
                                    <div className='field'>
                                        <label htmlFor='FIO'>ФИО*:</label>
                                        <input id='FIO' type='text'/>
                                    </div>
                                    <div className='field'>
                                        <label htmlFor='phone'>Телефон*:</label>
                                        <input id='phone' type='text'/>
                                    </div>
                                    <div className='field'>
                                        <label htmlFor='email'>Email:</label>
                                        <input id='email' type='text'/>
                                    </div>
                                </div>
                                <div className='modal-footer'>
                                    <button type='button' className='btn btn-default buttonBorder buttonStyle'
                                            data-dismiss='modal'>Отмена
                                    </button>
                                    <button type='button' className='btn btn-default buttonBorder buttonStyle'
                                            id="addName" onClick={this.addList}>Добавить
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row topBuffer'>
                        <div className='col-md-offset-2 col-sm-offset-2 col-md-8 col-sm-8'>
                            <div>
                                <input type='text' placeholder='Фильтр'
                                       className='buttonBorder filterStyle table-filters'
                                       onChange={this.filterTable}/>
                                <div className="flRight">
                                    <button type='button' className='btn btn-default buttonBorder buttonStyle'
                                            data-toggle='modal'
                                            data-target='#addElement'>Добавить
                                    </button>
                                </div>
                            </div>
                            <table
                                className='table table-bordered table-striped table-condensed table-hover bufferTable'
                                id="myTable" onClick={this.sortTable}>
                                <thead>
                                <tr className='tableCaption'>
                                    {
                                        fields.map(({id, name}, i) =>
                                            <th key={i}>
                                                <i className={'iRight'} id={`glyph${i}`}/>{name}
                                            </th>)
                                    }
                                </tr>
                                </thead>
                                <tbody>{
                                    this.state.displayedContacts.map((el) => {
                                        return <Contact
                                            key={Number(el.id)}
                                            Fio={el.FIO}
                                            Phone={el.phone}
                                            Email={el.email}/>;
                                    })
                                }</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
    });

    ReactDOM.render(
        <Phone />,
        document.getElementById('allTable')
    );

});