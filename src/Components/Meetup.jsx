import { useContext, useState } from "react";
import { useParams } from "react-router";
import { DataContext } from "../Context/DataContext";

export const Meetup = () => {
  const { meetID } = useParams();
  const { state, dispatch } = useContext(DataContext);
  const selectedMeetup = state.meetups.find((meet) => meet.id === meetID);
  const [dialogState, setDialogState] = useState(false);
  const handleRSVP = (meetID) => {
    setDialogState(false)
    dispatch({type : "SET_RSVP", payload : meetID})
  }
  
  return (
    <>
      <h2>{selectedMeetup.title}</h2>
      <p>Hosted By : {selectedMeetup.hostedBy}</p>
      <img
        src={selectedMeetup.eventThumbnail}
        alt=""
        width={350}
        height={250}
        style={{ objectFit: "cover", borderRadius: "10px" }}
      />
      <p>
        <b>Details : </b>
      </p>
      <p style={{ textAlign: "left" }}>{selectedMeetup.eventDescription}</p>
      <p><b>Location : </b></p>
      <p>{selectedMeetup.location}</p>
      <p>
        <b>Additional Information : </b>
      </p>
      <p>Dress Code : {selectedMeetup.additionalInformation.dressCode}</p>
      <p>
        Age Restrictions :{" "}
        {selectedMeetup.additionalInformation.ageRestrictions}
      </p>
      <p>
        <b>Event Tags : </b>
      </p>
      <ul
        style={{
          paddingInlineStart: "0",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {selectedMeetup.eventTags.map((tag) => {
          return (
            <p
              key={tag}
              style={{
                backgroundColor: "white",
                color: "black",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              {tag}
            </p>
          );
        })}
      </ul>
      <p>
        <b>Timings :</b>
      </p>
      <p>
        {new Date(selectedMeetup.eventStartTime).toString().split("GMT")[0]} to{" "}
        {new Date(selectedMeetup.eventEndTime).toString().split("GMT")[0]}
      </p>
      <p>
        <b>Price :</b>
      </p>
      <p>{selectedMeetup.price}</p>
      <p>
        <b>Speakers :</b>
      </p>
      <ul
        style={{
          paddingInlineStart: "0",
          display: "flex",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        {selectedMeetup.speakers.map((speaker) => {
          return (
            <div key={speaker.name}>
              <img
                src={speaker.image}
                alt=""
                width={80}
                height={80}
                style={{ borderRadius: "100%", objectFit: "cover" }}
              />
              <p style={{ marginBottom: "0" }}>{speaker.name}</p>
              <p style={{ marginTop: "0" }}>{speaker.designation}</p>
            </div>
          );
        })}
      </ul>
      <button
        style={{ width: "220px", backgroundColor: "red" }}
        onClick={() => selectedMeetup.isRSVP ? null : setDialogState(true)}
      >
        {selectedMeetup.isRSVP ? "Already RSVPED" : "RSVP"}
      </button>
      <dialog
        open={dialogState}
        style={{ width: "80%", height: "auto", marginTop: "-50px" }}
      >
        <div style={{display : "flex", flexDirection : "column", gap : "10px"}}>
          <h2>Complete your RSVP</h2>
          <p>Fill in your Personal Information</p>
          <label htmlFor="">Name :</label>
          <input type="text" name="" id="" />
          <label htmlFor="">Emails :</label>
          <input type="text" name="" id="" />
          <p>* You have to make the payment at the venue</p>
          <button onClick={() => handleRSVP(selectedMeetup.id)}>RSVP</button>
        </div>
      </dialog>
    </>
  );
};
