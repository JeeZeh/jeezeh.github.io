+++
title = "Winston"
date = 2025-10-01
external_links_target_blank = true
+++

# Introduction

This is my first project post, **welcome!**

I decided to do a write up on this short and getting-pretty-old-now project as a way to:

1. Get more familiar with this whole blogging thing
2. Find my way around the static-site tool I'm using to generate all of this ([**Zola**](https://www.getzola.org/))

While _Winston_ isn't a particularly technical project, I liked the practicality of it; maybe you'll find it useful or interesting too.

> Did you know you can build Word documents from Python? I didn't!

---

## Transcribing an interview with George Winston

<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/4zWwQIFVuMnKg7HsjhQ9Ut?utm_source=generator&theme=0" width="75%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

**A few years ago**, I found myself helping a friend transcribe an interview they conducted with the wonderful, late George Winston.
This was a back and forth conversation over 3 hours about his life and music. I offered to help them tackle the daunting task of _transcribing the whole thing_.

## Why do we need the transcription anyway?

The interview was conducted as part of a university project write up, so having a transcription of the full interview would make it much easier to reference interesting discussions and ideas easy later on. It would probably be read at least once in full, and frequently searched through the discussion to pull snippets and conversations. **In other words, we need a transcript that's easy to read and quickly searchable**.

Luckily, computers are quite good at displaying and searching through text, so the obvious choice was to transcribe the interview digitally, in a format that supported rich text rendering. Rather than trying doing this by hand, **the dreadful instinct to write a script took over**.

## The dreadful instinct

I knew the hardest part of this would be speech-to-text conversion, so I immediately went looking for something that would take care of that out of the box. I tried some basic, free STT tools online but (at the time) I couldn't find one that would **recognize and group speakers** automatically.

With two speakers talking (and often interleaving sentences), not being able to **distinguish which speaker said what** would make things really confusing, so making sure the transcription had each speaker clearly demarcated was important.

### Alexa, transcribe this 3 hour recording!

[Amazon Transcribe](https://aws.amazon.com/transcribe/) supported speaker-grouping, came with an—albeit _limited_—free tier, plus I had some experience working with AWS already, so I gave it a shot.

Its JSON output was nicely structured, with timestamps, confidence levels, and alternatives for each word (called a `pronunciation`).
The `confidence` score would come in useful later too: the interview included a lot of Proper Nouns and some unclear sections of audio, which will be helpful to highlight in the final output. Here's a modified example from the [AWS docs](https://docs.aws.amazon.com/transcribe/latest/dg/how-input.html):

```json
{
  "jobName": "my-first-transcription-job",
  "accountId": "111122223333",
  "results": {
    "transcripts": [
      {
        "transcript": "Welcome to Amazon Transcribe."
      }
    ],
    "items": [
      {
        "id": 0,
        "start_time": "0.64",
        "end_time": "1.09",
        "alternatives": [
          {
            "confidence": "1.0",
            "content": "Welcome"
          }
        ],
        "type": "pronunciation"
      },
      {
        "id": 1,
        "alternatives": [
          {
            "confidence": "0.0",
            "content": "!"
          }
        ],
        "type": "punctuation"
      }
      // ...
    ]
  }
}
```

Unfortunately, the conversation was a _bit longer_ than the 60 minutes offered under the free tier, but in the end it only cost ~$3. Worth it for the time saved, but an array of JSON objects wasn't going to cut it. I needed a format that would make it easy to read and search through all the `pronunciations` and `punctuations`, some sort of document of words.

### Building a Word Document

I reached for [python-docx](https://python-docx.readthedocs.io/en/latest/) for a programmatic way to build a Word document from the JSON output. The API is really quite simple:

```python
# Create a new document with a heading
doc = Document()
doc.add_heading(title, 0)

# Write some words to a paragraph
current_paragraph = doc.add_paragraph()
current_paragraph.add_run("Hello, Word!")

# Output
doc.save("Winston.docx")
```

From here, it was just a case of stepping through the JSON and building blocks of the transcript from each speaker:

```python
# Keep track of each speaker and produce a new section when they change.
current_speaker = None
for speaker_segment in transcript["results"]["speaker_labels"]["segments"]:
    name = speaker_names[speaker_segment["speaker_label"]]
    if current_speaker != name:
        speaker_start = speaker_segment["start_time"]
        start = # ...

        # Begin a new paragraph for the speaker
        doc.add_heading(f"{name} @ {start}", 2)

        for item in speaker_segment["items"]:
            # ...
```

I also really wanted to make use of the data Transcribe gave me, **in particular, the confidence level for each word:**

```python
for speaker_segment in transcript["results"]["speaker_labels"]["segments"]:
    # ...

    # Color each word by confidence level.
    current_paragraph.add_run(word).font.color.rgb = (
        RED
        if word_time_map[start].confidence < 0.5
        else ORANGE
        if word_time_map[start].confidence < 0.85
        else BLACK
)
```

### The final output

> The end result was... practical. It could have been prettier, but I needed to _save time_ here.

It's humbling what one can do with just a small bit of code (<100 lines) and an enterprise-scale audio transcription service from a cloud computing super giant.

![Screenshot of the Winston program output: a Word document showing speech grouped by speaker, with words colour-coded by confidence interval.](word.png#no-hover)

[GitHub](https://github.com/JeeZeh/winston)
