// Jenkinsfile
pipeline {

  agent {
    dockerfile true
  }

  stages {
    stage('build') {
      steps {
        sh 'php --version'
      }
    }
    stage('test') {
      steps {
        echo 'Hello, World!'
      }
    }
  }
}
