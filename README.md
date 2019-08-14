## SDC
to generate data run: npm run SdcGenData

in postman run localhost:4022 then the end points

connect via aws:
remove the space between the SDC and the gallery for the ssh connection

Working off the redis branch of artimiz gallery.The last functioning branch before that was AUG7

need to have 2 instances of the ec2 service up to work properly. One terminal running the server and one watching the webpack build. ALso need to have a redis terminal running. to launch redis redis-server

Go to modles.js line 36 and 41. read comments. Thats where you left off

# Bedroost Gallery Module

> Project description

## Related Projects

  - https://github.com/bedroost/review
  - https://github.com/bedroost/description
  - https://github.com/bedroost/booking

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> npm install

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## API Reference

| HTTP Method   | Endpoint                           | Description                                                   |
|:--------------|:-----------------------------------|:--------------------------------------------------------------|
| POST          | /api/:listingId/images             | Add a new image for a listing                                 |
| GET           | /api/:listingId/images             | Get all images for a listing                                  |
| PUT           | /api/:listingId/images/            | Update an image for a listing                                 |
| DELETE        | /api/:listingId/images/            | Delete an image from a listing                                |

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

