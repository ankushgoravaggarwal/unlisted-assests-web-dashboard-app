import "./tradereadystep4.css"
import React from "react";
import bank from "./Bank.png"
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import Buttons from "../../Components/Buttons"
import video from "./videopng.svg"



const useStyles = makeStyles((theme)=>({
    FormControl:{
        marginLeft:"7px",
        justifyContent:"space-between",
        paddingLeft:"10px"
    },
    label:{
        fontWeight: "500",
        fontSize: 14,
        color: "#2E384D",
        marginLeft: "7px",
        
    },
    droplabel:{
        fontWeight: "500",
        fontSize: 14,
        color: "#2E384D",
        marginLeft: "-2px",
        
    }
}))

let NSDLActiveAccount =()=>{
    const classes = useStyles()

    return(<div className="Trade_ready_step_4_container trade_ready_step_4_text">
        <div>
            <h3>NSDL Active Account.</h3>
            <form>
            <FormControl component="fieldset">
                                            {/* <FormLabel classes={{root:classes.label}} className="who_are_you"required component="legend">Add your speed E/CDSL or DIS process*</FormLabel> */}
                                            <RadioGroup className="trade_ready_step_4_Choose_radio_group"  aria-label="position" name="position" defaultValue="Email">
                                                <FormControlLabel
                                                className="Trade_ready_step_4_Choose_radio_border"
                                                value="Speed_E_NSDL"
                                                control={<Radio color="#721B65" />}
                                                label="Speed E NSDL"
                                                labelPlacement="start"
                                                classes={{root:classes.FormControl}}
                                                />
                                                <FormControlLabel
                                                className="Trade_ready_step_4_Choose_radio_border"
                                                value="CDSL"
                                                control={<Radio color="#721B65" />}
                                                label="CDSL"
                                                labelPlacement="start"
                                                classes={{root:classes.FormControl}}
                                                />
                                                <FormControlLabel
                                                className="Trade_ready_step_4_Choose_radio_border"
                                                value="DIS_process"
                                                control={<Radio color="#721B65" />}
                                                label="DIS process"
                                                labelPlacement="start"
                                                classes={{root:classes.FormControl}}
                                                />
                                                <FormControlLabel
                                                className="Trade_ready_step_4_Choose_radio_border"
                                                value="E_DIS_process"
                                                control={<Radio color="#721B65" />}
                                                label="E DIS process"
                                                labelPlacement="start"
                                                classes={{root:classes.FormControl}}
                                                />
                                                </RadioGroup>
           
                                            </FormControl>
                            
            </form>
            
            <div className="Trade_ready_step_4_save_button">
            <Buttons.SecondaryButton value="Previous"/>
            <Buttons.PrimaryButton value="Save & Continue"/>
            </div>
        </div>
        
                    <div className="Trade_ready_step_4_bank_image_container">
                        <div className="Trade_ready_step_4_bank_image_area"><img src={video}/></div>
                        <div className="Trade_ready_step_4_text"><p><b>Selecting between CDSL and E-DIS?</b></p><p> We feel this is one of the fastest way to communicate with you and 
                             upadate you with all the information about your transaction and shortlisted companies.</p></div>
                    </div>
        </div>
    )
}
export default NSDLActiveAccount