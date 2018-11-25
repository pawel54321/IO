pipeline {

  agent {
    docker {
      image 'node:alpine'
    }
  }

  stages {
    stage('Build'){
      steps {
        sh 'cd my-app'
        sh 'npm install'
        sh 'npm build'
      }
    }
    stage('Test'){
      steps {
        sh 'npm test'
      }
    }
    stage('Deploy'){
      steps {
        sh 'docker build -t react-app --no-cache .'
        sh 'docker tag react-app localhost:5000/react-app'
        sh 'docker push localhost:5000/react-app'
        sh 'docker rmi -f react-app localhost:5000/react-app'
      }
    }
  }
}
