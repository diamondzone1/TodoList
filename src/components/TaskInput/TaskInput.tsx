import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './TaskInput.module.scss'
import { Todo } from '../../@types/todo.type'
import { TodoTypes } from '../../PropTypes/todo.proptypes'


interface TaskInputProps {
    addTodo: (name: string) => void
    editTodo: (name: string) => void
    currentTodo: Todo | null
    finishEditTodo: () => void
}

export default function TaskInput(props: TaskInputProps) {
    const { addTodo, currentTodo, editTodo, finishEditTodo } = props
    const [name, setName] = useState<string>('')
    const HandleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (currentTodo) {
            finishEditTodo()
            if (name) setName('')
        } else {
            addTodo(name)
            setName('')
        }
        
    }

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target
        if (currentTodo) {
            editTodo(value)
        }
        else {
            setName(value)
        }

    }   

    
    return (
        <div className='mb-2'>
            <h1 className={styles.title}>To do list typescript</h1>
            <form className={styles.form} onSubmit={HandleSubmit}>
                <input 
                    type="text" 
                    placeholder='caption goes here' 
                    value ={currentTodo ? currentTodo.name : name} 
                    onChange ={onChangeInput}/>
                <button type='submit'>
                    {currentTodo ? '✔️' : '➕'}
                    
                </button>
                
            </form>

        </div>
    )
}

TaskInput.propTypes = {
    addTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    finishEditTodo: PropTypes.func.isRequired,
    currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])])
}