<div class="about">
	<div>
		<h1 class="header"><span class="react">React</span> <span class="rail">Rail</span></h1>
		<h3 class="subtitle">A modern train schedule for Irish Rail</h3>
	</div>
	<ul class="list">
		<li>This app allows you to view all trains passing through a given station.</li>
		<li>You can explore each train, its journey information, and live location map.</li>
		<li>This is not a commercial product, nor is it linked in any way to Iarnród Éireann.</li>
		<li>
			It was originally created as a learning project for React, feel free to read the <a
				href="https://github.com/JeeZeh/React-Irish-Rail">source code.</a
			>
		</li>
	</ul>
</div>

<style>
	@import url(https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&display=swap);

	.about {
		color: rgb(34, 34, 34);
		box-sizing: border-box;
		font-family: Nunito, sans-serif;
		grid-area: head / head / head / head;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		height: 100%;
		padding-right: 5px;
	}

	.header {
		color: rgb(34, 34, 34);
		user-select: none;
		box-sizing: border-box;
		font-family: Nunito, sans-serif;
		font-weight: 700;
		margin: 0px 0px 5px;
		filter: saturate(0.6);
		font-size: 2.6em;
	}

	.subtitle {
		color: rgb(34, 34, 34);
		user-select: none;
		font-weight: 500;
		font-size: 1.3em;
		margin: 0px;
		text-align: inherit;
		box-sizing: border-box;
		font-family: Nunito, sans-serif;
	}

	.list {
		user-select: none;
		width: 100%;
		padding-left: 0px;
		list-style-position: inside;
		color: rgb(68, 68, 68);
		opacity: 0.9;
		box-sizing: border-box;
		font-family: Nunito, sans-serif;
	}

	.react {
		color: rgb(85, 85, 102);
	}

	.rail {
		color: rgb(170, 85, 85);
	}
</style>
