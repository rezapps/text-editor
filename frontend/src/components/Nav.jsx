
const Nav = ({ saveDoc, cr8Doc, delDoc }) => {
    return (
        <nav>
            <ul>
                {!delDoc ? 
                    <li className="navBtn btn btn-primary" onClick={saveDoc}>
                        Save
                    </li>
                :
                <>
                    <li className="navBtn btn btn-primary" onClick={saveDoc}>
                        Save
                    </li>
                    <li className="navBtn btn btn-primary" onClick={cr8Doc}>
                        New
                    </li>
                    <li className="navBtn btn btn-danger" onClick={delDoc}>
                        Delete
                    </li>
                </>
                }
                
            </ul>
        </nav>
    );
};

export default Nav;
