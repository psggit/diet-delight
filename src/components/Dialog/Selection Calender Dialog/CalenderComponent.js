	import React from 'react';
	import './CalenderComponent.css'


	export default function CalenderComponent() {
		

		return (
			<div>


			<div className="month">      
			<ul>
			<li className="prev">&#10094;</li>
			<li className="next">&#10095;</li>
			<li>
			<span className="month_text_dialog">August</span>
			<span className="year_text_dialog">2021</span>
			</li>
			</ul>
			</div>

			<ul className="weekdays">
			<li>Mon</li>
			<li>Tue</li>
			<li>Wed</li>
			<li>Thu</li>
			<li>Fri</li>
			<li>Sat</li>
			<li>Sun</li>
			</ul>

			<ul className="days">  
			<li>01</li>
			<li>02</li>
			<li>03</li>
			<li>04</li>
			<li>05</li>
			<li>06</li>
			<li>07</li>
			<li>08</li>
			<li>09</li>
			<li><label className="active_com"><span className="active_number_com">10</span></label></li>
			<li><label className="active_com"><span className="active_number_com">11</span></label></li>
			<li>12</li>
			<li>13</li>
			<li><label className="light_active_com"><span className="light_active_number_com">14</span></label></li>
			<li>15</li>
			<li>16</li>
			<li>17</li>
			<li>18</li>
			<li>19</li>
			<li>20</li>
			<li>21</li>
			<li>22</li>
			<li>23</li>
			<li>24</li>
			<li><label className="active_violet"><span className="active_number_com">25</span></label></li>
			<li>26</li>
			<li>27</li>
			<li>28</li>
			<li>29</li>
			<li>30</li>	
			<li>31</li>
			</ul>

			</div>
			);
		}