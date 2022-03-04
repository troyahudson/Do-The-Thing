import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ConfirmationDialog.css'

export default function ConfirmationDialog({leftButton, rightButton, message, itemName}) {

    return (
        <div className='confirmation-root'>
            <div className='dialog-root'>
            <FontAwesomeIcon className='warning-icon' icon={faWarning}/>
                <p>{message}</p>
                <button className='leftButton' type="button" onClick={leftButton}>Delete {itemName}</button>
                <button className='rightButton' type="button" onClick={rightButton}>Cancel</button>
            </div>
        </div>
    )
}
