# uucloud-db-translator

## Installation
```
npm install -g uucloud-db-translator
```

## Usage
```
uucloud-db-translator <command> <command parameters>
```

## Commands
```
help                        Display this help.
translateDatabase           Performs DB translation (Does hard replace for whole document).
translateDatabaseForKeys    Performs DB translation for specific keys in the documents only.
translateJson               Performs DB export translation.
```

## Parameters

### --command string           
```translateJson```, ```translateDatabase```, ```translateDatabaseForKeys```, ```help``` commands. All these can be used as default commands without providing --command argument.

### -c, --config string        
File path to the configuration object.

### --database string[]            
Databases to be translated.

### --collection string[]          
Collections to be translated

### --excludeDatabase string[]     
Databases to be removed from the translation.

### --excludeCollection string[]   
Collections to be removed from the translation.

### --filePath string              
Applicable for ```translateJson``` command. File path to the JSON DB export which will be translated.

## Configuration

### configuration.json
```json
{
    "mongodb": {
        "host": "...",
        "port": "...",
        "username": "...",
        "password": "...",
        "options": {
            "chunkSize": 5000
        }
    },
    "translation": [
        [
            "old-value",
            "new-value"
        ]
    ],
    "keys": [
      "keyName" // must be specified in case of translateDatabaseForKeys command
    ]
}
```

## Logs
logs are automatically stored to the ```%HOME%/.uucloud-db-translator/logs``` folder