import './Board.css'
import { IoMdAdd } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import Card from '../Card/Card';
import UserIcon from '../UserIcon/UserIcon';
import { generateIntials, getRandomColor, priorities, statusIcons } from '../../utils/data';

const Board = (props) => {
    const { tickets, users, group, level, userId, order, data, addTicket } = props;

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

    const handleAddTicket = () => {
        const newTicket = {
            id: Date.now(), // Unique ID
            title: "New Ticket", // Default title
            status: group === 'status' ? data.title.toLowerCase() : 'backlog', // Default status
            priority: group === 'priority' ? level : 0, // Default priority
            userId: group === 'user' ? userId : null, // Assign to current user if grouped by user
            tag: [], // Default empty tags
        };
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
                    <IoMdAdd onClick={handleAddTicket} />
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
                        />)
                    })
                }
            </div>
        </div>
    )
}

export default Board;