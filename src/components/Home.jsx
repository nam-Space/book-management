import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [listBooks, setListBooks] = useState([])
    const [action, setAction] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('https://my-json-server.typicode.com/codegym-vn/mock-api-books/books')
            .then(res => {
                console.log("Gọi API ở trang home")
                setListBooks(res.data)
            })
    }, [])

    const handleAddBook = () => {
        navigate(`/update`, {
            state: {
                action: 'add'
            }
        })
    }

    const handleEditBook = (id) => {
        navigate(`/update`, {
            state: {
                id,
                action: 'edit'
            }
        })
    }

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa không?')) {
            axios.delete(`https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${id}`)
                .then(res => {
                    alert('Đã xóa thành công!')
                    console.log(res)
                })
        }
    }

    return (
        <div className='container'>
            <div className='d-flex justify-content-between'>
                <h1>Library</h1>
                <button className='btn btn-success' onClick={handleAddBook}>Add a new book</button>
            </div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listBooks.map((book, index) => (
                        <tr key={index}>
                            <td>{book.title}</td>
                            <td>{book.quantity}</td>
                            <td>
                                <button className='btn btn-info mx-2' onClick={() => handleEditBook(book.id)}>Edit</button> 
                                <button className='btn btn-danger' onClick={() => handleDelete(book.id)}>Delete</button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home