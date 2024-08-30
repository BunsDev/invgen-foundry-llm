# ensure openai api key is set
if [ -z "$OPENAI_API_KEY" ]; then
    echo "OPENAI_API_KEY is not set, please set it first"
    exit 1
fi
export OPENAI_API_KEY=$OPENAI_API_KEY

# check whether pnpm is installed
if ! command -v pnpm &> /dev/null
then
    echo "pnpm could not be found, installing..."
    npm install -g pnpm
fi

# install dependencies
pnpm install

# check whether docker is installed
if ! command -v docker &> /dev/null
then
    echo "docker could not be found, please install docker first"
    exit 1
fi

# setup weaviate
cd weaviate
rm -rf weaviate-container.tar.gz
wget https://ityfuzz.assets.fuzz.land/weaviate-container.tar.gz
export IMG_HASH=`docker import weaviate-container.tar.gz`
docker run -p 9401:8080 -d cr.weaviate.io/semitechnologies/multi2vec-clip:sentence-transformers-clip-ViT-B-32-multilingual-v1
echo "Using OpenAI API key: $OPENAI_API_KEY"
docker run -d \
 -p 9400:9400 \
 -v ./data:/var/lib/weaviate \
 -e ENABLE_MODULES=text2vec-openai,multi2vec-clip,generative-openai,generative-cohere \
 -e CLUSTER_HOSTNAME=node1 \
 -e OPENAI_APIKEY=$OPENAI_API_KEY \
 -e QUERY_DEFAULTS_LIMIT=25 \
 -e CLIP_INFERENCE_API=http://172.17.0.1:9401 \
 -e AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED=true \
 -e PERSISTENCE_DATA_PATH=/var/lib/weaviate \
 -e DEFAULT_VECTORIZER_MODULE=multi2vec-clip \
$IMG_HASH /bin/weaviate --host 0.0.0.0 --port 9400 --scheme http
cd ..

