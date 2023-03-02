import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TxtEditor from "../components/TxtEditor";
import Nav from "../components/Nav";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Editor() {
    // const user = null;
    const url = process.env.REACT_APP_API_URL || 'http://localhost:1337';

    const _id = useParams();
    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const navigate = useNavigate();

    function saveDoc() {
        const doc = {
            title: title,
            text: text
        }

        if (_id.id === 'NEW'){
            axios.post(`${url}/api/docs/create`,doc)
            .then((res) => {
                if (res.status === 200) {
                    toast("New document saved Successfully!")
                }
            })
        } else {
            axios.patch(`${url}/api/docs/${_id.id}`, doc)
            .then((res) => {
                if (res.status === 200) {
                    toast("Document Updated Successfully!")
                }
            })
        }
    }



    function delDoc() {
        const id = _id.id;

        if (_id.id !== 'NEW'){
            axios.delete(`${url}/api/docs/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    toast("Document Deleted Successfully!")
                }
            })
        }
    }
    


    function cr8Doc() {
        navigate(`/editor/NEW`);
    }

    useEffect(() => {

        const currDoc = JSON.parse(localStorage.getItem('currentDoc'));

        if (currDoc && currDoc._id === _id.id) {
            setText(currDoc.text);
            setTitle(currDoc.title);

        } else {
            navigate(`/editor/NEW`);
        }
            
    }, [_id.id, navigate]);

    return (
        <main>
            {_id.id === 'NEW' ?
                <>
                    <Nav placeHolder='Untitled' saveDoc={saveDoc}/>
                    <TxtEditor placeHolder='type here...' setTitle={setTitle} setText={setText}  />
                </>
                :
                <>
                    <Nav saveDoc={saveDoc} cr8Doc={cr8Doc} delDoc={delDoc}/>
                    <TxtEditor _id={_id.id} title={title} text={text} setTitle={setTitle} setText={setText}  />
                </>
            }
            
            <ToastContainer />
        </main>
    )
}

export default Editor;
