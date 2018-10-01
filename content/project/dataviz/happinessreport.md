---
title: "Happiness Report"
date: 2018-04-01T17:54:41+02:00
tool: "R"
field: "Data visualisation"
draft: false
---
<div class="container">
	<article>
<p><strong> What does happiness mean to me?</strong></p>

<p>I guess everyone would have some unsmooth period. When I was unhappy, I really questioned myself what happiness should be. For sure, it depends. However, as a human in a construction of society, do we share some common values on happiness?</p>

<p>One day I felt I could try to look for some report or standard to help myself thinking about the concept. Yes, I really found one: The United Nations are producing an annual <a href="http://worldhappiness.report">World Happiness Report</a> supported by several independent experts all over the world since 2012.</p>

<p>The report defines happiness as <strong>subjective well-being</strong> with 6 predictors: GDP per capita, healthy life expectancy at birth, social support, freedom to make life choices, generosity, perception of corruption and an unexplainable residual. I agree with the subjectivity on happiness and I think one who want to pursue happiness should really properly respect oneself.</p>

<p>Freedom is essential for my happiness, so I used <a href="https://ggplot2.tidyverse.org">ggplot2</a> in R to do some static graphs. At that time, I was also reading <a href="http://www.storytellingwithdata.com/book/">Storytelling with data</a>. I got to know the way that data is manipulated will much affect the information sent to the audience.</p>

<p>Therefore, I made two graphs: one shows the freedom score versus the ranking of happiness and the other shows the ratio of freedom to the total happiness score.</p>

<p><storng>It seems that the freedom score of the top-ranking countries are generally higher. However, a simple division by the happiness score changed the shape. The contribution of freedom to happiness in top-ranking countries are similarly moderate, but varies more and more as the ranking decreases.</strong></p>

	  </article>

 {{<figure src="/img/freedom_abs.jpg" caption="Freedom score from World Happiness Report, 2018" class="center">}}
    
 {{<figure src="/img/freedom.jpg" caption="Contribution of freedom to Happiness, 2018" class="center">}} 
    

</div>

