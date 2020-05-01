Bootstraped using

    docker run -it --rm -v $(pwd):/opt -w /opt -u $(id -u ${USER}):$(id -g ${USER}) node:12 npx create-react-app my-app --use-npm --template typescript

Then follow https://ant.design/docs/react/use-with-create-react-app#Install-and-Initialization

Then apply https://github.com/ant-design/ant-design/issues/23624#issuecomment-621069469
