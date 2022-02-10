<script context="module" lang="ts">
	export const prerender = true;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<div class="intro">
		<h1>Jesse Ashmore</h1>
		<p>
			I write software
			<a
				href="https://www.amazon.jobs/en-gb/landing_pages/icc"
				target="_blank"
				referrerpolicy="no-referrer"
				aria-label="A link to my current Org in Amazon">for a living</a
			>
			and
			<a
				href="https://github.com/JeeZeh/"
				target="_blank"
				referrerpolicy="no-referrer"
				aria-label="A link to my GitHub profile">for fun</a
			>.
		</p>
	</div>

	<hr />

	<div class="project-container">
		<div class="project">
			<img src="reactrail.png" alt="React Rail logo" class="img-left" />
			<div class="description">
				<h2>React Rail</h2>
				<p>A modern Irish Rail timetable PWA designed for mobile and desktop</p>
			</div>
		</div>

		<div class="project">
			<img src="steamshortcut.png" alt="Steam Shortcut Generator logo" class="img-left" />
			<div class="description">
				<h2>Steam Shortcut Generator</h2>
				<p>A script to generate shortcuts with icons for all installed Steam library games</p>
			</div>
		</div>

		<div class="project">
			<img src="autosub.png" alt="YouTube Playlist Autosub Explorer logo" class="img-left" />
			<div class="description">
				<h2>YouTube Playlist Autosub Explorer</h2>
				<p>
					An app that can be used to archive and fuzzy search an entire YouTube playlist for words,
					phrases, and sentences.
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: left;
		flex: 1;
	}

	h1 {
		width: 100%;
		margin: 4rem 0 3rem 0;
	}

	.intro {
		text-align: left;
		line-height: 0;
	}

	.intro > p {
		transform: translateX(2.3rem);
		margin: 0;
	}

	.project-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-self: center;
		width: 80%;
		margin-top: 2rem;
	}

	.project-container .project {
		margin-bottom: 4rem;
	}

	.project {
		display: grid;
		grid-template-columns: 1fr 3fr 1fr;
		width: 100%;
	}

	.right {
		text-align: right;
	}

	.description h2 {
		margin: 0;
		font-family: 'Lato';
		font-weight: 900;
	}

	.project .description {
		grid-column: 2;
		margin: 0 2rem;
		grid-row: start;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.project .img-left {
		grid-column: 1;
		grid-row: start;
	}

	.project .img-right {
		grid-column: 3;
		grid-row: start;
	}

	.project img {
		height: auto;
		width: 150px;
	}

	hr {
		width: 100%;
		margin: 4rem 0 2rem 0;
		opacity: 0.5;
	}
</style>
