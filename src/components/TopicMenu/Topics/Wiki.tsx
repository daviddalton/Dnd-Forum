import CharacterClassData from "../../../api/CharacterClassData";
import {useQuery} from "@tanstack/react-query";
import TopicMenu from "../TopicMenu";
import { red } from "@mui/material/colors";
import { Outlet } from "react-router-dom";

const classData = new CharacterClassData()

function Wiki() {

    const { data, status } = useQuery(['classes'], classData.fetchClasses)


    if (status === "loading") return <p>Loading...</p>;
    if (status === "error") return <p>Error</p>;
    if (status !== "success") {
        return null;
    }

    return<>
    <div
        style={{
            width: '100%',
            height: '100vh',
            marginTop: '60px',
            background: '#222831'
        }}>
        <Outlet />
    </div>


    </>
}

export default Wiki;