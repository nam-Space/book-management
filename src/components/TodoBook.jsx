import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const TodoBook = () => {
    const {state: {id, action}} = useLocation()
    const [book, setBook] = useState({title: '', quantity: 0})
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            axios.get(`https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${id}`)
                .then(res => {
                    setBook(res.data)
                    console.log(res.data)
                })
        }
        
    }, [id])

    const validateChema = Yup.object().shape({
        title: Yup.string().required('Vui lòng nhập trường này'),
        quantity: Yup.number('Số lượng phải là số').required('Vui lòng nhập trường này')
    })

    const handleChange = e => {
        setBook({
            ...book, [e.target.name] : e.target.value
        })
        console.log(e.target.name, e.target.value)
    }

    const handleSubmit = (values) => {
        if (action === 'edit') {
            axios.put(`https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${id}`, values)
                .then(res => {
                    alert('Update successful!')
                    console.log(res)
                    navigate('/')
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            axios.post(`https://my-json-server.typicode.com/codegym-vn/mock-api-books/books`, values)
                .then(res => {
                    alert('Update successful!')
                    console.log(res)
                    navigate('/')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <div className='container'>
            <h1 className='my-5'>{action === 'edit' ? 'Edit book' : 'Add book'}</h1>
            <Formik
                initialValues={book}
                enableReinitialize
                validationSchema={validateChema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <p>Title</p>
                    <Field name='title' value={book.title || ''} onChange={handleChange} type='text'/>
                    <ErrorMessage component='div' name='title' className='error'/>
                    <br/>
                    <br/>

                    <p>Quantity</p>
                    <Field name='quantity' value={book.quantity || ''} onChange={handleChange} type='number'/>
                    <ErrorMessage component='div' name='quantity' className='error' />
                    <br />
                    <br />

                    <button type='submit' className='btn btn-success'>{action === 'edit' ? 'Save' : 'Add'}</button>
                </Form>
            </Formik>
        </div>
    )
}

export default TodoBook