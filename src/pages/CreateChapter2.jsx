import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {server} from '../server.js'


const Hr = styled.hr`
  margin: 15px 0px;
  border: 3px solid gray;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.textSoft};
  margin-top: 13px;
`;

const Information = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.text};
  margin-top: 13px;
`;

function CreateChapter2({ isLightMode }) {
  const [name, setName] = useState('');
  const [src, setSrc] = useState('');
  const [file, setFile] = useState(null);
  const { courseId, nameM } = useParams();
  const [chapters, setChapters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // to page admin 




  // to get chapter 
  const fetchChapters = async () => {
    try {
      const res = await axios.get(`${server}/api/chapter/getChapter/${courseId}`);
      setChapters(res.data);
    } catch (error) {
      console.error(error);
    }
  };








  // to work the function fetchChapters
  useEffect(() => {
    fetchChapters();
  }, [courseId]);















  // to get the file form the input 
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };














  // to save the data to the database chapter 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('file', file);
      if (!name || !file) {
        alert('Please fill in all the required fields.');
        return;
      }
      await toast.promise(axios.post(`${server}/api/chapter/${courseId}`, formData), {
        pending: 'Creating chapter ...',
        success: 'Chapter created successfully',
        error: 'An error occurred while creating the chapter.'
      });

 

      // Refresh the chapters list
      fetchChapters();

      setName('');
      setSrc('');
      setFile(null);

      // Show success message or redirect to another page
    } catch (error) {
      console.error(error);
      // Show error message
      alert('Failed to add chapter. Please try again.');
    }
  };















  // to delete the chpater
  const handleDelete = async (chapterId) => {
    try {
      
      await toast.promise(axios.delete(`${server}/api/chapter/delete/${chapterId}`), {
        pending: 'chapter Deleting ...',
        success: 'chapter deleted successfully',
        error: 'An error occurred while deleting the chapter .'
      });
      // Refresh the chapters list
      fetchChapters();

    } catch (error) {
      console.error(error);
      // Show error message
      alert('Failed to delete chapter. Please try again.');
    }
  };








  //to the search 
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };



  // to searche 
  const filteredChapters = chapters.filter((chapter) => {
    return chapter.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
















  return (
    <>
      <ToastContainer></ToastContainer>
      <div class="card-body">
        <h3 className={` fw-normal text-dark`}> {nameM}</h3>
      </div>



      <Hr style={{ color: `${isLightMode ? 'gray' : 'white'}` }} />

      <div className="container">
        <h1 className={`mt-4 mb-4 display-3 fw-normal text-dark text-center`}>
          Create Chapter
        </h1>
        <br />


        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="mb-3">
            <div className="mb-3">


              <label htmlFor="name" className={`form-label text-dark `}>
                Name:
              </label>



              <input
                type="text"
                id="name"
                className="form-control"
                style={{ color: 'black' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="file" className={`form-label text-dark `}>
                File:
              </label>



              <input
                type="file"
                id="file"
                className="form-control"
                accept=".pdf"
                onChange={handleFileChange}
              />



            </div>
          </div>
          <br />
          <button
            type="submit"
            className={`btn btn-outline-dark btn-lg`}
          >
            Add Chapter
          </button>
        </form>
        <br />
        <br />
        <div className="mb-3">


          <input
            type="text"
            id="search"
            className="form-control"
            style={{ color: 'black' }}
            placeholder="Search chapters"
            value={searchTerm}
            onChange={handleSearch}
          />


        </div>
        <div
          className={`table-responsiv table-light`}
          style={{ borderRadius: '20px' }}
        >
          <table
            className={`table table-borderless table-striped table-light`}
          >
            <thead className='bg-light'>
              <tr>
                <th>Name of Module:</th>
                <th> </th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredChapters.map((course) => (
                <tr key={course._id}>
                  <td>
                    <div className="d-flex justify-content-between align-items-center ">
                    <a  target="_blank"
            rel="noopener" href={course.file} className='text-dark m-4 display-5'>{course.name}</a>
                    </div>
                  </td>
                  <td></td>
                  <td>
                    <div>
                      <button
                        type="button"
                        className={`btn btn-outline-dark btn-sm m-4`}
                        onClick={() => handleDelete(course._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CreateChapter2;
