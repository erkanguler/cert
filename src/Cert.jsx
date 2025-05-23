import React, { useState, useEffect } from 'react';
import axios from "axios";
import './styling/Cert.css';
import { Container, Row, Col } from 'react-bootstrap';
import certImage from './assets/networkSecurityImage.webp';
import certImage2 from './assets/webdev_img.webp';
import Itcourses from './components/ITcertificates'; 
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 


export default function Cert() {
  const { t } = useTranslation(); 
  const [selectedCategory, setSelectedCategory] = useState('IT-proffs');
  const [selectedCourse, setSelectedCourse] = useState('Microsoft Fundamentals');

  const [selectedCertificate, setSelectedCertificate] = useState('');
  const [allCourses, setAllCourses] = useState([]);
  const [relevantCertificates, setRelevantCertificates] = useState([]);

  // Get translated course array
  const courses = Itcourses(); // ✅ Function call to get data  


  useEffect(() => {
    axios.get('http://3.90.225.16:5011/api/examdate')
    .then(res => {
      console.log(res.data);
      setAllCourses(res.data);
    })
  }, []);

const categories = [
  t('it_pros'),  
  'Business_education',
  'IT_user',
  'Distance_education',
  'Seminar'
];


  // Filter courses based on category
  const filteredCourses = courses.filter(course => course.category === selectedCategory);
  const currentCourse = filteredCourses.find(course => course.courseName === selectedCourse);

  const seeTestTimes = (certName) => {
    console.log("Clicked on:", certName);
    setSelectedCertificate(certName);
  };

  // Filter array based on selected certificate
 useEffect(() => {
  if (selectedCertificate) {
    console.log("🔍 Searching for certificate...:", selectedCertificate);
    
    const filteredCertificates = allCourses.filter((course) =>
      course.certName.trim().toLowerCase() === selectedCertificate.trim().toLowerCase()
    );

    if (filteredCertificates.length > 0) {
      setRelevantCertificates(filteredCertificates); 
      console.log("✅ Chosen certificates with available slots:", filteredCertificates);
    } else {
      setRelevantCertificates([]); 
      console.log("❌ No available slots for:", selectedCertificate);
    }
  }
}, [selectedCertificate, allCourses]);

  function formatCurrency(price) {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0,
    }).format(price);
  }

  
  return (
    <div>
      <section className='certificatesPage'>
        <h1>{t('certifications')}</h1>
      </section>

      <section className='certificatesPageSectionTwo py-5'>
        <Container>
          <Row className='align-items-center mb-5'>
            <Col md={6}>
              <h2>{t('IT_certification')}</h2>
              <p>{t('IT_certification_description')}</p>
            </Col>
            <Col md={6}>
              <img
                src={certImage}
                alt={t('certification_image')}
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>

          <Row className='align-items-center mb-5'>
            <Col md={6}>
              <img
                src={certImage2}
                alt={t('webdesign_certification_image')}
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6}>
              <h2>{t('Webdesign_UX')}</h2>
              <p>{t('Webdesign_UX_description')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='py-5 certificatepageSectionthree'>
        <Row className="mb-4 mx-auto d-flex justify-content-center w-100 text-center">
          <Col md={6}>
            <figure>
              <blockquote className="blockquote">
                <p>{t('course_description')}</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                {t('certification_explanation')}
              </figcaption>
            </figure>
          </Col>
        </Row>

        <Container>
          <Row>
            {courses.map((course) => (
              <Col md={4} className='course-card my-3' key={course.courseName}>
                {course.courseName}
                <img src={course.image} alt={course.courseName}></img>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className='py-5 certificatepageSectionfour'>
        <Container>
          <h2 className="text-center mb-4">{t('search_for_certificates')}</h2>

          <div className="mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            {/* Kategori-select */}
            <label htmlFor="categoryFilter" className="form-label">{t('select_category')}:</label>
            <select
              id="categoryFilter"
              className="form-select mb-3"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedCourse('');
              }}
            >
              <option value="">{t('choose_category')}</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Kurs-select (visas först när kategori är vald) */}
            {selectedCategory && (
              <>
                <label htmlFor="courseFilter" className="form-label">{t('select_course')}:</label>
                <select
                  id="courseFilter"
                  className="form-select"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">{t('choose_course')}</option>
                  {filteredCourses.map((course, idx) => (
                    <option key={idx} value={course.courseName}>{course.courseName}</option>
                  ))}
                </select>
              </>
            )}
          </div>

          {/* Visar certifikat om en kurs är vald */}
          {currentCourse && (
            <Row className="mt-4">
              <Col md={4} className="mb-4 text-center">
                <h3>{currentCourse.courseName}</h3>
                <p>{currentCourse.description}</p>
                <img
                  src={currentCourse.image}
                  alt={currentCourse.courseName}
                  className="img-fluid mb-4 rounded shadow-sm"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
              </Col>
              <Col md={7}>
                <h5>{t('certifications_for_this_course')}</h5>
                <ul className="list-group">
                  {currentCourse.certs.map((cert, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                      {cert}
                      {/* <Link to={`/cert/${cert}`}> */}
                        <button className="btn btn-primary btn-sm" onClick={() => seeTestTimes(cert)}>
                          {t('view_available_timeslots')}
                        </button>
                      {/* </Link> */}
                    </li>
                  ))}
                </ul>

                {relevantCertificates && relevantCertificates.length > 0 ? (
                  <div className="mt-4">
                    <h5>{t('available_exam_times')} {selectedCertificate}</h5>
                    <ul className="list-group">
                      {relevantCertificates.map((certificate, idx) => (
                        <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                          <span><strong>{new Date(certificate.examStartingTime).toLocaleString()} - {new Date(certificate.examEndingTime).toLocaleTimeString()}</strong></span>
                          {t('Price')} ({formatCurrency(certificate.price)})
                          <button className='btn btn-primary' style={{padding: "5px", borderRadius: "5px"}}>{t('book_time')}</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : selectedCertificate ? (
                  <p className="mt-4 text-danger">{t('no_exam_dates_available')}</p>
                ) : null}


              </Col>
            </Row>
          )}
        </Container>
      </section>
    </div>
  );
}
