import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import ExitFill from "../../../assets/icons/exitFill";
import ExitNoFill from "../../../assets/icons/exitNoFill";
import { Wrapper } from "../../../assets/styles/wrappers/popUp";

const Backdrop = ({ action }) => {
    const dispatch = useDispatch();

    // allowed scroll on modal load 
    const closeModal = () => {
        document.body.style.overflow = 'unset';
    };

    return (
        <Wrapper>
            <div
                onClick={() => {
                    closeModal();
                    dispatch(action());
                }}
                className="backdrop"
            ></div>
        </Wrapper>
    );
};

const PopUpOverlay = ({ action, children }) => {
    const [over, setOver] = useState(false);
    const dispatch = useDispatch();

    // disable scroll on modal load 
    useMemo(() => {
        document.body.style.overflow = 'hidden';
    }, []);

    // allowed scroll on modal load 
    const closeModal = () => {
        document.body.style.overflow = 'unset';
    };
    
    return (
        <Wrapper>
            <div className="data">
                <div className="model">
                    <h2
                        className="exit w-full md:hidden flex justify-end"
                        onMouseOver={() => setOver(true)}
                        onMouseLeave={() => setOver(false)}
                        onClick={() => {
                            closeModal();
                            dispatch(action());
                        }}
                    >
                        {over ? (
                            <ExitFill className="icon" width={32} height={32} />
                        ) : (
                            <ExitNoFill className="icon" width={32} height={32} />
                        )}
                    </h2>
                    <div>{children}</div>
                </div>
            </div>
        </Wrapper>
    );
};
const portalElement = document.getElementById("overlays");
const PopUPModel = ({ action, children }) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop action={action} />, portalElement)}
            {ReactDOM.createPortal(
                <PopUpOverlay action={action}>{children}</PopUpOverlay>,
                portalElement
            )}
        </React.Fragment>
    );
};

export default PopUPModel;
