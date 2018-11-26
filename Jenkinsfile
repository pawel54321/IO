pipeline {
  agent {
    docker {
      image 'node:alpine'
      args '-u root'
    }
  }

  stages {
    stage('Build'){
      steps{
        sh 'npm install --prefix react-app'
        sh 'npm run build --prefix react-app'
      }
    }
    stage('Test'){
      steps{
        sh 'npm test --prefix react-app --forceExit'
      }
    }
    stage('Deploy'){
      steps {
        sh 'npm start --prefix react-app'
      }
    }
  }
}
