import { useContext, useState } from "react";
import { DataContext } from "../Context/DataContext";
import { NavLink } from "react-router-dom";

export const Home = () => {
  const { state } = useContext(DataContext);
  const [typeFilter, setTypeFilter] = useState("Online")
  const [searchKeys, setSearchKeys] = useState("")
  const filteredState = state.meetups.filter(meet => (typeFilter==="Both" ? true : meet.eventType==typeFilter) && meet.title.toLowerCase().includes(searchKeys.toLowerCase()))
  return (
    <>
      <h2>All the Events 🦄</h2>
      <label htmlFor="">Search for events : </label>
      <input type="text" name="" id="" onChange={(e) => setSearchKeys(e.target.value)}/>
      <br />
      <label htmlFor="">Event Type : </label>
      <select name="" id="" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
        <option value="Both">Both</option>
        <option value="Online">Online</option>
        <option value="Offline">Offline</option>
      </select>
      <ul style={{paddingInlineStart : "0", listStyle : "none", display : "flex", flexWrap : "wrap", gap : "20px"}} >
        {filteredState.map((meet) => {
          return (
            <li key={meet.id}>
              <NavLink to={`/meetup/${meet.id}`}>
              <img src={meet.eventThumbnail} alt="" width={200} height={200} style={{borderRadius : "10px", objectFit : "cover"}}/>
              <p>{meet.eventType} Event</p>
              <p>{new Date(meet.eventStartTime).toString().split("GMT")[0]} IST</p>
              <h4>{meet.title}</h4>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
};
