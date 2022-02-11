<div class="main">
	<h3>View upcoming trains at a station</h3>
	<div>
		<div>
			<input
				placeholder="Type a station name"
				aria-label="Input box for searching a station"
				disabled
				value=""
			/>
		</div>
	</div>
	<div class="time">
		<button name="Select 15 minutes lookahead">15 mins</button><button
			name="Select 30 minutes lookahead">30 mins</button
		><button name="Select 60 minutes lookahead" class="selected">60 mins</button><button
			name="Select 90 minutes lookahead">90 mins</button
		>
	</div>
</div>

<style>
	.main {
		color: rgb(34, 34, 34);
		box-sizing: border-box;
		font-family: Nunito, sans-serif;
		width: 350px;
		margin: 20px 15px;
		user-select: none;
	}

	h3 {
		color: rgb(34, 34, 34);
		font-weight: 700;
		font-size: 1.3em;
		margin: 0px 0px 10px;
		text-align: left;
		box-sizing: border-box;
		font-family: Nunito, sans-serif;
	}

	input {
		background: rgb(254, 254, 254);
		color: rgb(34, 34, 34);
		font-size: 0.95em;
		width: 100%;
		height: 50px;
		display: inline-block;
		padding: 10px;
		border-top: 1px solid rgb(170, 170, 170);
		border-right: 1px solid rgb(170, 170, 170);
		border-left: 1px solid rgb(170, 170, 170);
		border-image: initial;
		border-radius: 5px 5px 0px 0px;
		border-bottom: none;
		outline: none;
		box-shadow: rgb(187, 187, 187) 0px 4px 4px;
		transition: all 0.1s ease-out 0s;
		box-sizing: border-box;
		font-family: Nunito, sans-serif;
	}

	.time {
		color: rgb(34, 34, 34);
		display: inline-flex;
		flex-direction: row;
		border: 1px solid rgb(170, 170, 170);
		border-radius: 0px 0px 5px 5px;
		background-color: rgb(244, 244, 244);
		grid-area: paramsbar / paramsbar / paramsbar / paramsbar;
		justify-content: space-evenly;
		width: 100%;
		height: 50px;
		max-width: 400px;
		overflow: hidden;
		user-select: none;
		z-index: 1;
		box-shadow: rgb(187, 187, 187) 0px 4px 4px;
		position: relative;
		box-sizing: border-box;
		font-family: Nunito, sans-serif;
	}

	button {
		user-select: none;
		font-size: 1em;
		display: flex;
		-webkit-box-pack: center;
		justify-content: center;
		width: 100%;
		-webkit-box-align: center;
		align-items: center;
		font-weight: bold;
		overflow: hidden;
		color: rgb(136, 136, 136);
		background-color: inherit;
		padding: 8px;
		cursor: default;
		border: none;
		outline: none;
		box-sizing: border-box;
		font-family: Nunito, sans-serif;
	}

	.selected {
		color: rgb(68, 68, 68);
		background-color: rgb(254, 254, 254);
		padding: 8px;
	}
</style>
