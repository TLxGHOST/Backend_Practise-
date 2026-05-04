import React from "react";
import contacts from "../contacts";

export function Card(props) {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>

      <div className="card">
        <div className="top">
          <h2 className="name">{props.name}</h2>

          <img
            className="circle-img"
            src={props.img?.src}
            alt={props.img?.alt}
          />
        </div>

        <div className="bottom">
          <p className="info">{props.contact}</p>
          <p className="info">{props.email}</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return contacts.map((contact, index) => (
    // console.log(contact);
    <Card
      key={index}
      name={contact.name}
      img={{
        src: contact.imgURL,
        alt: "avatar_img",
      }}
      contact={contact.phone}
      email={contact.email}
    />
  ));
}

export default App;
