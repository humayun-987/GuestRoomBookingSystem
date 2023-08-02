import React, { useState } from 'react';
import "./style.css";
import { useMediaQuery } from 'react-responsive';

export default function Conduction() {
    const [phase, setPhase] = useState(1);
    const isMobileorTab = useMediaQuery({ query: '(max-width: 800px)' });
    const phaseclick = (value) => {
        setPhase(value);
    }
    if (isMobileorTab) {
        return (
            <>
                <div className="conduction-phase-body mt-4 mb-4">
                    <div className="conduct-phases-head">
                        <div className={phase == 1 ? "phases-head-active" : "phases-head"}>
                            <h5 onClick={() => phaseclick(1)} className='cond-head-phase'> Phase 1</h5>
                            <p className={phase == 1 ? "phases-text-active" : "phases-text"}>
                                The Phase 1 exam for UNOSQ will be conducted ONLINE .It will encompass a syllabus that includes object-type questions covering
                                various aspects such  as Logical Reasoning ,Verbal Ability,Quantitative Aptitude,and Sports.The duration of the exam will be 90 minutes.
                                From Phase 1,the top 100 performers will qualify for the Phase 2 Exam in each of the four pools.
                            </p>
                        </div>
                        <div className={phase == 2 ? "phases-head-active" : "phases-head"}>
                            <h5 onClick={() => phaseclick(2)} className='cond-head-phase'> Phase 2</h5>
                            <p className={phase == 2 ? "phases-text-active" : "phases-text"}>
                                The syllabus for Phase 2 of UNOSQ will remain the same as Phase 1,with an increase of difficulty level.
                                The duration of the Phase 2 exam will be reduced to 75 minutes. Additionally, engaging talks and exhibitions
                                will enhance the enthusiasm and excitement  of the students who qualify for Phase2.This crucial round will determine
                                the top three winners of UNOSQ'23,who will receive exciting prizes and complimentary passes to Udghosh Pronite.
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className="conduction-phase-body mt-4 mb-4">
                    <div className="conduct-phases-head">
                        <div className={phase == 1 ? "phases-head-active" : "phases-head"}>
                            <h5 onClick={() => phaseclick(1)} className='cond-head-phase'> Phase 1</h5>
                        </div>
                        <div className={phase == 2 ? "phases-head-active" : "phases-head"}>
                            <h5 onClick={() => phaseclick(2)} className='cond-head-phase'> Phase 2</h5>
                        </div>
                    </div>
                    <div className="conduct-phases-text">
                        <p className={phase == 1 ? "phases-text-active" : "phases-text"}>
                            The Phase 1 exam for UNOSQ will be conducted ONLINE .It will encompass a syllabus that includes object-type questions covering
                            various aspects such  as Logical Reasoning ,Verbal Ability,Quantitative Aptitude,and Sports.The duration of the exam will be 90 minutes.
                            From Phase 1,the top 100 performers will qualify for the Phase 2 Exam in each of the four pools.
                        </p>
                        <p className={phase == 2 ? "phases-text-active" : "phases-text"}>
                            The syllabus for Phase 2 of UNOSQ will remain the same as Phase 1,with an increase of difficulty level.
                            The duration of the Phase 2 exam will be reduced to 75 minutes. Additionally, engaging talks and exhibitions
                            will enhance the enthusiasm and excitement  of the students who qualify for Phase2.This crucial round will determine
                            the top three winners of UNOSQ'23,who will receive exciting prizes and complimentary passes to Udghosh Pronite.
                        </p>
                    </div>
                </div>
            </>
        )
    }

}
