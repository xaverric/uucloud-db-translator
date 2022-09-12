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
help                Display this help.
translateDatabase   Performs DB translation.
translateJson       Performs DB export translation.
```

## Parameters

### --command string           
```translateJson```, ```translateDatabase```, ```help``` commands. All these can be used as default commands without providing --command argument.

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
    ]
}
```

## Logs
logs are automatically stored to the ```%HOME%/.uucloud-db-translator/logs``` folder