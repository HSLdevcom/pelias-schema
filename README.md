## Installation

```bash
$ git clone
$ npm install
```

## Usage

#### create index

```bash
node scripts/create_index.js;               # quick start
```

#### drop index

```bash
node scripts/drop_index.js;                 # drop everything
node scripts/drop_index.js --force-yes;     # skip warning prompt
```

#### reset a single type

This is useful when you want to reset a single `type` without wiping the rest of your `index`.

```bash
node scripts/reset_type.js mytype;          # reset a single type
```

#### update settings on an existing index

This is useful when you want to add a new analyser or filter to an existing index.

**note:** it is impossible to change the `number_of_shards` for an existing index, this will require a full re-index.

```bash
node scripts/update_settings.js;          # update index settings
```

#### output schema file

Use this script to pretty-print the whole schema file or a single mapping to stdout.

```bash
node scripts/output_mapping.js mytype;          # single type mapping
node scripts/output_mapping.js;                 # whole schema file
```

#### check all mandatory elasticsearch plugins are correctly installed

Print a list of which plugins are installed and how to install any that are missing.

```bash
node scripts/check_plugins.js;
```

## Contributing

Please fork and pull request against upstream master on a feature branch.

Pretty please; provide unit tests and script fixtures in the `test` directory.

### Running Unit Tests

```bash
$ npm test
```

### Running elasticsearch in Docker (for testing purposes)

Download the image and start an elasticsearch docker container:

```bash
$ docker run --name elastic-test -p 9200:9200 elasticsearch:2
```

Once the service has started you will need to ensure the plugins are installed, in a new window:

```bash
$ node scripts/check_plugins.js

--------------------------------
 checking elasticsearch plugins
--------------------------------

node 'Nebulon' [x5sGjG6lSc2lWMf_hd6NwA]
 checking plugin 'analysis-icu': ✖

1 required plugin(s) are not installed on the node(s) shown above.
you must install the plugins before continuing with the installation.

you can install the missing packages on 'Nebulon' [172.17.0.2] with the following command(s):

 sudo /usr/share/elasticsearch/bin/plugin install analysis-icu

note: some plugins may require you to restart elasticsearch.
```

While the docker container is still running, execute this in another window:

```bash
$ docker exec -it elastic-test /usr/share/elasticsearch/bin/plugin install analysis-icu
-> Installing analysis-icu...
Trying https://download.elastic.co/elasticsearch/release/org/elasticsearch/plugin/analysis-icu/2.4.5/analysis-icu-2.4.5.zip ...
Downloading .............................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................DONE
Verifying https://download.elastic.co/elasticsearch/release/org/elasticsearch/plugin/analysis-icu/2.4.5/analysis-icu-2.4.5.zip checksums if available ...
Downloading .DONE
Installed analysis-icu into /usr/share/elasticsearch/plugins/analysis-icu
```

The plugin has been installed, you will now need to restart the elasticsearch service:

```bash
# use ctrl+c to exit and then:

$ docker start elastic-test
```

The restarted server should now pass the `node scripts/check_plugins.js` check, you are good to go.
