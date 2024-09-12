import React from 'react';
import './Testimonials.css';
import avatar1 from '../../assets/avatar1.png';
import avatar2 from '../../assets/avatar2.png';
import avatar3 from '../../assets/avatar3.png';
import avatar4 from '../../assets/avatar4.png';
import avatar5 from '../../assets/avatar5.png';
import avatar6 from '../../assets/avatar6.png';
import avatar7 from '../../assets/avatar7.png';
import avatar8 from '../../assets/avatar8.png';
import avatar9 from '../../assets/avatar9.png';

const testimonials = [
  {
    text: "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention.",
    imageSrc: avatar1,
    name: "Jamie Rivera",
    username: "@jamietechguru00",
  },
  {
    text: "Our team's productivity has skyrocketed since we started using this tool.",
    imageSrc: avatar2,
    name: "Josh Smith",
    username: "@jjsmith",
  },
  {
    text: "This app has completely transformed how I manage my projects and deadlines.",
    imageSrc: avatar3,
    name: "Morgan Lee",
    username: "@morganleewhiz",
  },
  {
    text: "I was amazed at how quickly we were able to integrate this app into our workflow.",
    imageSrc: avatar4,
    name: "Casey Jordan",
    username: "@caseyj",
  },
  {
    text: "Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.",
    imageSrc: avatar5,
    name: "Taylor Kim",
    username: "@taylorkimm",
  },
  {
    text: "The customizability and integration capabilities of this app are top-notch.",
    imageSrc: avatar6,
    name: "Riley Smith",
    username: "@rileysmith1",
  },
  {
    text: "Adopting this app for our team has streamlined our project management and improved communication across the board.",
    imageSrc: avatar7,
    name: "Jordan Patels",
    username: "@jpatelsdesign",
  },
  {
    text: "With this app, we can easily assign tasks, track progress, and manage documents all in one place.",
    imageSrc: avatar8,
    name: "Sam Dawson",
    username: "@dawsontechtips",
  },
  {
    text: "Its user-friendly interface and robust features support our diverse needs.",
    imageSrc: avatar9,
    name: "Casey Harper",
    username: "@casey09",
  },
];

function Testimonials() {
  const column1 = testimonials.slice(0, 3);
  const column2 = testimonials.slice(3, 6);
  const column3 = testimonials.slice(6, 9);

  return (
    <div className="testimonials-container">
      <div className="boxx1">
        <h1 className='gradient actionHeading'>What our users say</h1>
        <br />
        <p>Here’s what our users say about our product</p>
      </div>
      <div className="blur-overlay blur-top"></div>
      <div className="testimonials-columns">
        {[column1, column2, column3].map((column, i) => (
          <div key={i} className="testimonials-column">
            <div className="testimonials-wrapper">
              {column.concat(column).map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <img src={testimonial.imageSrc} alt={testimonial.name} className="testimonial-avatar" />
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <h3 className="testimonial-name">{testimonial.name}</h3>
                  <p className="testimonial-username">{testimonial.username}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="blur-overlay blur-bottom"></div>
    </div>
  );
}

export default Testimonials;
