import './Board.css'
import { IoMdAdd } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import Card from '../Card/Card';
import UserIcon from '../UserIcon/UserIcon';
import Modal from './modal.jsx'; // Import the Modal component
import { generateIntials, getRandomColor, priorities, statusIcons } from '../../utils/data';
import { useState } from 'react';

const Board = (props) => {
    const { tickets, users, group, level, userId, order, data, addTicket, deleteTicket, editTicket, moveTicket } = props;
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    let filteredTickets = [];
    if (group === 'status')
        filteredTickets = tickets.filter(ticket => ticket.status.toLowerCase() === data.title.toLowerCase());
    else if (group === 'priority')
        filteredTickets = tickets.filter(ticket => ticket.priority === level);
    else
        filteredTickets = tickets.filter(ticket => ticket.userId === userId);

    if (order === 'priority')
        filteredTickets = filteredTickets.slice().sort((a, b) => b.priority - a.priority);
    else
        filteredTickets = filteredTickets.slice().sort((a, b) => a.title.localeCompare(b.title));

    const handleAddTicket = (newTicket) => {
        addTicket(newTicket);
    };

    return (
        <div className='board'>
            <div className='board_top'>
                <div className="board_top_name">
                    <span style={{ color: data.color }}>{data.icon}</span>
                    <p>{data.title} </p>
                    <span>{filteredTickets.length}</span>
                </div>
                <div className="board_top_options">
                    <IoMdAdd onClick={() => setIsModalOpen(true)} /> {/* Open modal on click */}
                    <SlOptions />
                </div>
            </div>
            <div className="board_container">
                {
                    filteredTickets.map((ticket) => {
                        const user = users?.find(user => user.id === ticket.userId)
                        return (<Card
                            ticket={ticket}
                            key={ticket.id}
                            user={user}
                            group={group}
                            statusIcon={statusIcons[ticket?.status.toLowerCase()]?.icon || ""}
                            statusColor={statusIcons[ticket?.status.toLowerCase()]?.color || ""}
                            bgColor={getRandomColor()}
                            icon={priorities[ticket?.priority]?.icon || ""}
                            onDelete={deleteTicket} // Pass the delete function
                            onEdit={editTicket}
                            onMove={moveTicket}
                        />)
                    })
                }
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddTicket}
            />
        </div>
    )
}

export default Board;