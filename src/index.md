---
layout: layouts/home
title: Community-Led Co-design Kit
eleventyNavigation:
    order: 0
    key: Home
---
An open source toolkit for sharing knowledge about how to do co-design led by community members and organizations.

## Community-led co-design

Community-led co-design is an approach in which the co-design process, not just the outcomes, is developed in
collaboration with community members who will be directly impacted by the design.

Community-led co-design:

* Recognizes and leverages community leadership
* Uses a familiar and comfortable environment
* Creates more engaged communities
* Moves from design _with_ to design _by_

[Read more about co-design and community-led co-design](/about/)

## Where to start

1. Introduction  
   Read the [Introduction to co-design and community-led co-design](#TODO)
2. How to use this kit  
   Read the guide on [How to use this Kit](#TODO)
3. Explore this kit
   Look through this kit by:  
   [Co-design building blocks](#building-blocks-of-codesign)  
   Or, [Browse all](/#browse-all)

## Explore this kit

<!-- TODO: Add playlists -->

### Building blocks of co-design

Each of these blocks includes guides, activities, and tools.

{% for block in buildingBlocks %}
   <h4>{{ block.name | safe }}</h4>
   <p>{{ block.description | safe }}</p>
   <p><a href="/resources/#{{ block.name | slug | codesign }}">Browse methods in {{ block.name | lower | safe }}</a></p>
{% endfor %}

### Browse all

[Browse all resources](/resources/)
