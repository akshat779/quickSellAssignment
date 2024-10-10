import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTicket = {
            id: Date.now(),
            title: formData.get('title'),
            status: formData.get('status'),
            priority: parseInt(formData.get('priority'), 10),
            userId: formData.get('userId'),
            tag: formData.get('tag').split(',').map(tag => tag.trim()),
        };
        onSubmit(newTicket);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal_content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text" name="title" required />
                    </label>
                    <label>
                        Status:
                        <input type="text" name="status" required />
                    </label>
                    <label>
                        Priority:
                        <input type="number" name="priority" min="0" max="4" required />
                    </label>
                    <label>
                        User ID:
                        <input type="text" name="userId" />
                    </label>
                    <label>
                        Tags (comma separated):
                        <input type="text" name="tag" />
                    </label>
                    <button type="submit">Add Ticket</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;