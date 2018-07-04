import React from 'react';
import { Button, Row, Col } from 'reactstrap'
//import { Button } from "reactstrap";
//import Row from "../components/Row";
//import Col from "../components/Col";
import { Link } from 'react-router-dom';
import Hero from "../components/Hero";
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';


const New = ({ secretData, user }) => (
	<div>
		<Hero backgroundImage="./images/miab.jpeg">

			<Card className="container" >


				<CardTitle style={{
					backgroundColor: "rgba(22, 86, 179, .8)",
					border: "none",
					boxShadow: "none",
					paddingBottom: "2rem"
				}}
					title="These are your new Bottles"
				/>

				<h3>unordered list of generated bottles? -avram</h3>
				<h3>This is another.</h3>
				<h3>There could be a whole bunch if you haven't checked them for a while.</h3>
			</Card>
		</Hero>

	</div>



)

export default New;