import loremIpsum from 'lorem-ipsum'

// https://stackoverflow.com/a/4879879
function convertCase(str) {
  var lower = String(str).toLowerCase();
  return lower.replace(/(^| )(\w)/g, function(x) {
    return x.toUpperCase();
  });
}

function word(n) {
  return loremIpsum({count: n, units: 'words'})
}

function uWord(n) {
  return convertCase(word(n))
}

function sentence(n) {
  return loremIpsum({count: n, units: 'sentences'})
}

export default {
  "resume": {
    "firstName": "JOHN",
    "lastName": "SMITH",
    "role": "Software Developer",
    "blurb": '"' + word(3) + '."',
    "work": [{
      "startDate": "January 2014",
      "endDate": "Present",
      "name": "My current employer",
      "role": "Software Developer",
      "text": [
        "*Italic text is surrounded by asterisks (*).*",
        sentence(3),
        sentence(2)
      ]
    },
    {
      "startDate": "December 2010",
      "endDate": "January 2014",
      "name": word(2),
      "role": word(2),
      "text": [
        "*" + sentence(1) + "*",
        sentence(5)
      ]
    }],
    "personal": [{
      "field": "NAME",
      "text": ["John Smith"]
    }, {
      "field": "ADDRESS",
      "text": ["1 Pizza Street", "Sydney, NSW 2000"]
    },
    {
      "field": "PHONE",
      "text": ["0400 000 000"]
    },
    {
      "field": "EMAIL",
      "text": [loremIpsum({count: 1, units: 'words'}) + "@" + loremIpsum({count: 1, units: 'words'}) + "." + loremIpsum({count: 1, units: 'words'})]
    }],
    "skills": [{
      "field": uWord(2),
      "stars": 5,
      "started": 2009,
      "subskills": [uWord(1), uWord(1), uWord(1)]
    }, {
      "field": uWord(2),
      "stars": 5,
      "started": 2011,
      "subskills": [uWord(1)]
    }, {
      "field": uWord(2),
      "stars": 4,
      "started": 2012,
      "subskills": [uWord(1), uWord(1), uWord(1), uWord(1), uWord(1), uWord(1)]
    }, {
      "field": uWord(2),
      "stars": 3,
      "started": 2015
    }, {
      "field": uWord(2),
      "stars": 2,
      "started": 2016,
      "subskills": [uWord(1), uWord(1), uWord(1), uWord(1), uWord(1), uWord(1), uWord(1), uWord(1), uWord(1)]
    }, {
      "field": uWord(2),
      "stars": 1,
      "started": 2017
    }],
    "education": [{
      "startDate": "January 2009",
      "endDate": "November 2010",
      "name": uWord(2),
      "degree": "Master of " + uWord(1)
    }, {
      "startDate": "January 2006",
      "endDate": "December 2008",
      "name": uWord(2),
      "degree": "Bachelor of " + uWord(1)
    }]
  }
}
